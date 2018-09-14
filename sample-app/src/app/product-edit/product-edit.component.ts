import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from '../api/my.api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  productNumber:string = '';
  productName:string = '';
  id:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'productNumber' : [null, Validators.required],
      'productName' : [null, Validators.required]
    });
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      this.id = data.productNumber;
      this.productForm.setValue({
        productNumber: data.productNumber,
        productName: data.productName,
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateProduct(this.id, form)
      .subscribe(res => {
          let id = res['productNumber'];
          this.router.navigate(['/product-detail', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  productDetail() {
    this.router.navigate(['/product-detail', this.id]);
  }
}
