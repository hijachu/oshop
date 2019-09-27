import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  // products: {title: string}[];
  // products: any[];
  products: AngularFireAction<DatabaseSnapshot<Product>>[];
  filterProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    // this.products$ = productService.getAll();
    this.subscription = productService.getAll()
      .subscribe((products: AngularFireAction<DatabaseSnapshot<Product>>[]) => this.filterProducts = this.products = products);
  }

  filter(query: string) {
    // console.log(query);
    this.filterProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
