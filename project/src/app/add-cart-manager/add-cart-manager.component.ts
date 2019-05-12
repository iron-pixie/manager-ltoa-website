import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatTableDataSource,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-add-cart-manager',
  templateUrl: './add-cart-manager.component.html',
  styleUrls: ['./add-cart-manager.component.css']
})
export class AddCartManagerComponent implements OnInit {
  formGroup:FormGroup;
  tableClass;
  serverUrl;
  routingString:string;
  img;
  newImages=null;
  residentAddressSource;

  constructor( private http:HttpClient, private location:Location) {
    this.routingString="/tickets"
    this.formGroup = new FormGroup({
      address:new FormControl(),
      cartMake:new FormControl(),
      cartModel:new FormControl(),
      serialNumber: new FormControl(),
      labelNumber: new FormControl()
    });
    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    http.get('https://d1jq46p2xy7y8u.cloudfront.net/member/all',{headers: headersVar})
    .subscribe(response => {
      let dataResponse=null;
      dataResponse=response;
      response=null;
      this.residentAddressSource = new MatTableDataSource(dataResponse); 
      this.residentAddressSource.filterPredicate = function(data,residentAddress): boolean{
        return data.memberAddress.toLowerCase().trim().includes(residentAddress);
      }
    })
   }

  ngOnInit() {
  }

  createPost(input :HTMLInputElement){
    let post =input;
    let face={
      "ownerAddress":post["address"],
      "cartMake":post["cartMake"],
      "cartModel":post["cartModel"],
      "serialNumber":post["serialNumber"],
      "labelNumber":post["labelNumber"]
    }

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/action/add',face,{headers: headersVar})
      .subscribe((val) => {
        this.back();
      });
  }

  filterResidentData(){
    this.residentAddressSource.filter = this.formGroup.get("address").value;
  }

  submit(form){
    let values=form.value;

    form.reset();

    this.createPost(values);

  } 

  back(){
    this.location.back();
  }
}
