import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product-service.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'price', 'buttons'];
  dataSource: any[] = [
    { id: 1, name: "Phone", price: 111.11 },
    { id: 2, name: "Webcam", price: 111.11 },
    { id: 3, name: "Monitor", price: 111.11 },
  ]

  products: Product[] = [];
  productSubscription = new Subscription();

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.productSubscription = this.productService.productSubject.subscribe(fetchedProducts => {
      this.products = fetchedProducts;
    });
    this.products = this.productService.products;
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  onDelete(index: number) {
    this.productService.onDelete(index);
  }

  onEdit(index: number) {
    this.router.navigate(["edit-product", index]);
  }

  onTest() {
    console.log(this.products);
  }
}
