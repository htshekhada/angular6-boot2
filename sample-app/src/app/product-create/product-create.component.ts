import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyApiService } from '../api/my.api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  productNumber:string='';
  productName:string='';

  constructor(private router: Router, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'productNumber' : [null, Validators.required],
      'productName' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postProduct(form)
      .subscribe(res => {
          let id = res['productNumber'];
          this.router.navigate(['/product-detail', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
