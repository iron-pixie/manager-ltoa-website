import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
let parseString = require('xml2js').parseString;

@Component({
  selector: 'input-ui-workorder',
  templateUrl: './../input-ui-workorder/input-ui-workorder.component.html',
  styleUrls: ['./input-ui-workorder.component.css']
})
export class InputUiWorkorderComponent{

  formGroup:FormGroup;
  tableClass;
  serverUrl;
  routingString:string;
  img;
  newImages=null;
  residentAddressSource;

  bucket = new S3(
    {
      accessKeyId: 'AKIAJXK7O6II5KS4X4WQ',
      secretAccessKey: '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',
      region: 'us-west-2'
    }
  );

  statuses = [
    {value:"pending",viewValue:"pending"},
    { value:"complete",viewValue:"complete"}
  ]

  types =[
    {value:"Traffic violations",viewValue:"Traffic violations"},
    {value:"Trashcan violations",viewValue:"Trashcan violations"}
  ]

  constructor(private messageService: MessageService, private http:HttpClient,private location:Location) {
    this.routingString="/workorders"
    this.formGroup = new FormGroup({
      address:new FormControl(),
      type:new FormControl(),
      status:new FormControl(),
      responsibleManager:new FormControl(),
      notes: new FormControl()
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

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
  }

  filterResidentData(){
    this.residentAddressSource.filter = this.formGroup.get("address").value;
  }

  imageSubmit(id){
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "w"+id+"0."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {});
   
  }

  createPost(input :HTMLInputElement){

    let face={
      "Status":input["status"],
      "workType":input["type"],
      "ResponsibleManager":input["responsibleManager"],
      "Notes":input["notes"],
      "userName":window.localStorage.getItem("username"),
      "Address":input["address"]
    }

    let jsonFace=JSON.stringify(face)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/work/add',jsonFace,{headers: headersVar})
      .subscribe((val) => {
        if(this.newImages!=null){
          this.imageSubmit(val["id"]);
        }
        this.back();
      });
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
