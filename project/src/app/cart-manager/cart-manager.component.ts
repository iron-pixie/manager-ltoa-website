import { Component, OnInit } from '@angular/core';
import { TableUiInterfaceComponent } from '../table-ui-interface/table-ui-interface.component';
import { MatTableDataSource } from '@angular/material';
import { MessageService } from '../services/message-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css']
})
export class CartManagerComponent implements OnInit {

  cartSource
  keys=["Address","Cart Make","Cart Model","Serial Number","Label Number"];
  keysPlus=["Address","Cart Make","Cart Model","Serial Number","Label Number","Delete"]
  getDone=false;
  constructor(private location:Location, private http:Http,private router:Router, private httpC:HttpClient){ 

    let cartArray=[];

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/cart/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json();
        response=null;

        for(let data of dataResponse){
          cartArray.push(
            new Cart(
              data.ownerAddress,
              data.cartMake,
              data.cartModel,
              data.serialNumber,
              data.labelNumber
            )
          )
        }
        this.cartSource = new MatTableDataSource(cartArray);
        this.getDone=true;
      })

  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

  viewRow(item){
    window.localStorage.setItem("id",item.invoiceId);    
    this.router.navigate(['/web/record/'+item.invoiceId]);
  }

  moveToAddCart(){
    this.router.navigate(['/web/cartManager/add']);
  }

  deleteRow(cart){
    let face={
      "serialNumber":cart["serialNumber"],
    }

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.httpC.post('https://d1jq46p2xy7y8u.cloudfront.net/cart/delete',face,{headers: headersVar,responseType:"text"})
      .subscribe((res)=>{})
  }
}

class Cart{
  ownerAddress:string;
  cartMake:string;
  cartModel:string;
  serialNumber:string;
  labelNumber:string;

  constructor(ownerAddress,cartMake,cartModel,serialNumber,labelNumber){
    this.ownerAddress=ownerAddress;
    this.cartMake=cartMake;
    this.cartModel=cartModel;
    this.serialNumber=serialNumber;
    this.labelNumber=labelNumber;
  }
}