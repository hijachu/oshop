import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

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
  // filterProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource< AngularFireAction<DatabaseSnapshot<Product>> >;
  items: AngularFireAction<DatabaseSnapshot<Product>>[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    // this.products$ = productService.getAll();
    this.subscription = productService.getAll()
      .subscribe((products: AngularFireAction<DatabaseSnapshot<Product>>[]) => {
        // this.filterProducts = this.products = products;
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: AngularFireAction<DatabaseSnapshot<Product>>[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    // console.log(query);
    // this.filterProducts = (query) ?
    let filterProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    // this.initializeTable(this.filterProducts);
    this.initializeTable(filterProducts);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
