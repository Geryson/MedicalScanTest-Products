import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, Subject, of, throwError } from "rxjs";
import { ProductAPI } from "./product-api.component";
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from "./notification-service.component";

@Injectable({providedIn: "root"})
export class ProductService {
    products: Product[] = [];
    productSubject = new Subject<Product[]>();

    productsFetched: boolean = false;
    observableProducts: Observable<Product[]> = this.productSubject.asObservable();

    constructor(private api: ProductAPI, private notificationService: NotificationService) {
        this.fetchProducts();
    }

    fetchProducts() {
        this.api.getAllProducts().subscribe(
            products => {
                this.products = products;
                this.productSubject.next(this.products);
                this.productsFetched = true;
            },
            error => this.handleError(error)
        );
    }

    public getFetchedProducts(): Observable<any> {
        if (this.productsFetched) {
          return this.observableProducts;
        } else {
          return new Observable<any>(observer => {
            const subscription = this.observableProducts.subscribe({
              next: (data) => {
                observer.next(data);
                observer.complete();
                subscription.unsubscribe();
              }
            });
          });
        }
      }

    onDelete(id: number) {
        this.api.deleteProduct(id).pipe(
            tap(() => {
                this.products = this.products.filter(product => product.id !== id);
                this.productSubject.next(this.products);
            }),
            catchError(errorResponse => {
                this.handleError(errorResponse);
                return errorResponse;
            })
        ).subscribe();
    }

    onAdd(product: Product) {
        this.api.addProduct(product).pipe(
            tap(response => {
                this.products = [...this.products, {
                    id: response.id,
                    name: response.name,
                    price: response.price
                }];
                this.productSubject.next(this.products);
            }),
            catchError(errorResponse => {
                this.handleError(errorResponse);
                return errorResponse;
            })
        ).subscribe();
    }

    getProduct(id: number) {
        return this.products.find(x => x.id === id);
    }

    onUpdate(productId: number, updatedProduct: Product) {
        this.api.updateProduct(productId, updatedProduct).pipe(
            tap(() => {
                const index = this.products.findIndex(product => product.id === productId);
                if (index !== -1) {
                    this.products[index].name = updatedProduct.name;
                    this.products[index].price = updatedProduct.price;
                    this.productSubject.next(this.products);
                }
            }),
            catchError(errorResponse => {
                this.handleError(errorResponse);
                return errorResponse;
            })
        ).subscribe();
    }

    private handleError(response: any): void {
        //console.error('An error occurred:', response.error);
        this.notificationService.createNotification('An error occurred: ' + response.error);
    }
}
