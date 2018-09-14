import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../api/my.api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any;
  displayedColumns = ['productName', 'productNumber'];
  dataSource = new ProductDataSource(this.api);

  constructor(private api: MyApiService) { }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(response => {
        console.log(response);
        this.products = response;
      }, err => {
        console.log(err);
      });
  }
}

export class ProductDataSource extends DataSource<any> {
  constructor(private api: MyApiService) {
    super()
  }

  connect() {
    return this.api.getProducts();
  }

  disconnect() {

  }
}