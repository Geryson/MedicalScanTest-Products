import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataComponent } from './product-data.component';
import { ProductService } from '../shared/product-service.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductAPI } from '../shared/product-api.component';

describe('ProductDataComponent', () => {
  let component: ProductDataComponent;
  let fixture: ComponentFixture<ProductDataComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let activatedRoute: ActivatedRoute;
  let httpClient: HttpClient;
  let productAPI: ProductAPI;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDataComponent],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: ProductAPI, useValue: productAPI},
        {provide: ProductService, useValue: productService},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDataComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    productAPI = new ProductAPI(httpClient);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
