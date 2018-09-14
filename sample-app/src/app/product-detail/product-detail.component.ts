import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from '../api/my.api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product = {};

  constructor(private route: ActivatedRoute, private api: MyApiService, private router: Router) { }

  ngOnInit() {
    this.getProductDetail(this.route.snapshot.params['id']);
  }

  getProductDetail(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        console.log(data);
        this.product = data;
      });
  }

  deleteProduct(id) {
    this.api.deleteProduct(id)
      .subscribe(res => {
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
