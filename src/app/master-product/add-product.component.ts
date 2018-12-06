import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService} from '../_services/product.service';
import { ProductDetails } from '../_models/product';
import { Alert } from 'selenium-webdriver';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'add-master-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public session: any;
  addProductForm: FormGroup;
  loading = false;
  submitted = false;
  Product = new ProductDetails();
  disabledAddUpdate : boolean = false;
  public productlist : any;
  public queryParamData : any;
  constructor(private ProductService: ProductService,
              private formBuilder: FormBuilder,
              private Router: Router,
              private route: ActivatedRoute
   ) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };

    this.addProductForm = this.formBuilder.group({
        Prod_Name: ['', Validators.required],
        Prod_Description: ['', Validators.required],
        IsActive:['','']
    });
    this.queryParamData = this.route.queryParams.subscribe(params => {
      this.productlist ={
       'Product_Id' : params['Product_Id'],
       'Product_Name' : params['Product_Name'],
       'Product_Desc' : params['Product_Desc'],
       'IsActive' : params['IsActive']
      } 
    });
    this.disabledAddUpdate = this.productlist.Product_Id;
    this.f.Prod_Name.setValue(this.productlist.Product_Name);
    this.f.Prod_Description.setValue(this.productlist.Product_Desc);
    this.f.IsActive.setValue(this.productlist.IsActive);
    
  }
  get f() { return this.addProductForm.controls;
  }

  onSubmit() {
    var param;
    this.loading = true;
    this.submitted = true;
    if (this.addProductForm.invalid) {
        this.loading = false;
        return;
    }else{
      if(this.productlist.Product_Id != undefined){
         param = {
          Product_Id:  this.productlist.Product_Id,
          Product_Name: this.f.Prod_Name.value,
          Product_Desc: this.f.Prod_Description.value,
          IsActive: this.f.IsActive.value,
          Modified_By: this.session.session.PK_Resource_Id
        };
        this.ProductService.updateProductDetails(param).subscribe(result => {
          this.productlist = result;
          this.Router.navigate(['/masterProduct']);
          this.loading = false;
        });
      }else{
         param = {
            Product_Id:  this.Product.Product_Id = 0,
            Product_Name: this.f.Prod_Name.value,
            Product_Desc: this.f.Prod_Description.value,
            IsActive: this.f.IsActive.value,
            Created_By: this.session.session.PK_Resource_Id
        };
        this.ProductService.addProductDetails(param).subscribe(result => {
              this.productlist = result;
              this.Router.navigate(['/masterProduct']);
              this.loading = false;
        });
      }
    }
  }
}