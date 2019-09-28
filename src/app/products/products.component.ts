import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from './../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }
}
