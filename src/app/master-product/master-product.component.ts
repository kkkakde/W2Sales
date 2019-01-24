import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService} from '../_services/product.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css']
})
export class MasterProductComponent implements OnInit {

  page: number ;
  filter: any;
  totalRec: number;
  public productDetails : any;
  public navigationExtras: any;
  constructor(private ProductService: ProductService, private Router: Router) { }

  ngOnInit() {
    
    this.ProductService.getAllProducts().subscribe(result => {
      this.productDetails = result;
    });
    
  }

  //edit product details
  editProductDetails(item){
    this.navigationExtras = {
      queryParams: {
        Product_Id: item.Product_Id,
        Product_Name: item.Product_Name,
        Product_Desc: item.Product_Desc,
        IsActive: item.IsActive,
      }
    };
    this.Router.navigate(['/addProduct'],this.navigationExtras);
  }

  navigateToAddProduct(){
    this.Router.navigate(['/addProduct']);
  }
}
