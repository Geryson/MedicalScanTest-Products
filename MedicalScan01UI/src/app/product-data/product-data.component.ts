import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../shared/product-service.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/product.model';
import { NotificationService } from '../shared/notification-service.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-data',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, CommonModule],
  templateUrl: './product-data.component.html',
  styleUrl: './product-data.component.css'
})
export class ProductDataComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  editMode = false;
  product: Product;
  productId: number;

  productSubscription = new Subscription();

  constructor(private productService: ProductService, private router: Router,
    private activatedRoute: ActivatedRoute, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    console.log('init');
    if (this.productService.productsFetched) {
      this.allElse();
      this.loadForm();
    } else {
      this.productSubscription = this.productService.getFetchedProducts().subscribe(data => {
        this.allElse();
        this.loadForm();
      })
    }
  }

  allElse() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.productId = +paramMap.get('id')!;
        this.product = this.productService.getProduct(this.productId)!;
      } else {
        this.editMode = false;
      }
    });

    if (this.productId != null && this.product == null) {
      this.router.navigateByUrl("");
      this.notificationService.createNotification('Product with id ' + this.productId + ' not found. Returning to product list...');
    }

    
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.productSubscription.unsubscribe();
  }

  loadForm() {
    this.productForm = new FormGroup({
      "id": new FormControl(this.editMode && this.product != null ? this.product.id : 0),
      "name": new FormControl(this.editMode && this.product != null ? this.product.name : null, [Validators.required]),
      "price": new FormControl(this.editMode && this.product != null ? this.product.price : null, [Validators.required]),
    })
  }

  onSubmit() {
    const newProduct = new Product(this.productForm.value.id, this.productForm.value.name, this.productForm.value.price);

    if (this.editMode) {
      this.productService.onUpdate(this.productId, newProduct);
    } else {
      this.productService.onAdd(newProduct);
    }
    this.router.navigateByUrl("");
  }

  getNameErrorMessage() {
    if (this.productForm.controls['name'].hasError('required')) {
      return 'Naming the product is required';
    }
    return '';
  }

  getPriceErrorMessage() {
    const priceControl = this.productForm.controls['price'];
    if (priceControl.hasError('required')) {
      return 'Pricing the product is required';
    } else if (priceControl.hasError('min') || priceControl.hasError('max')) {
      return 'Price value should be a number between 0.01 and 9999.99'
    }
    return '';
  }
}
