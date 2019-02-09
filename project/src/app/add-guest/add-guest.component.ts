import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  formGroup:FormGroup;
  newImages:any=[];
  imageUploaded=false;
  guest;
  image;
  isSecurity=false;
  userLevel;

  residentNameSource;
  residentAddressSource;

  bucket = new S3(
    {
      accessKeyId: 'AKIAJXK7O6II5KS4X4WQ',
      secretAccessKey: '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',
      region: 'us-west-2'
    }
  );

  constructor(private location:Location, private http:HttpClient) { 
    this.userLevel=window.localStorage.getItem("userLevel");
    if(this.userLevel == "security"){
      this.isSecurity=true;
    }

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    http.get('https://d1jq46p2xy7y8u.cloudfront.net/member/all',{headers: headersVar})
      .subscribe(response => {
        let dataResponse=null;
        dataResponse=response;
        response=null;
        this.residentNameSource = new MatTableDataSource(dataResponse); 
        this.residentAddressSource = new MatTableDataSource(dataResponse);
        this.residentNameSource.filterPredicate = function(data,residentName): boolean{
          return data.memberName.toLowerCase().trim().includes(residentName);
        }
        this.residentAddressSource.filterPredicate = function(data,residentAddress): boolean{
          return data.memberAddress.toLowerCase().trim().includes(residentAddress);
        }
      })

    this.formGroup = new FormGroup({
      guestName:new FormControl(),
      allowedStartTime: new FormControl(),
      allowedEndTime: new FormControl(),
      reason: new FormControl(),
      residentName: new FormControl(""),
      residentAddress: new FormControl("")
    });
  }

  ngOnInit() {
  }

  submit(form){
    let values=form.value;

    form.reset();

    this.createGuest(values);
  }

  submitCheckbox(event){
    if(event.target.checked){
      this.formGroup.get("allowedStartTime").disable();
      this.formGroup.get("allowedEndTime").disable();
    }
    else{
      this.formGroup.get("allowedStartTime").enable();
      this.formGroup.get("allowedEndTime").enable();
    }
  }

  createGuest(input :HTMLInputElement){
    let post =input;
    let userName = window.localStorage.getItem("username");
    const currentDate = new Date();
    let day = currentDate.getDate().toString();
    day=day.length<2?"0"+day:day;
    const month = currentDate.getMonth(); 
    const year = currentDate.getFullYear();
    const nextYear = year+1;
    const nextYearFullDate = nextYear+"-"+month+"-"+day;
    if(this.formGroup.get("allowedStartTime").disabled){
      post["allowedStartTime"]="2018-12-07";
      post["allowedEndTime"]="null";
    }
    if(this.isSecurity==true){
      this.guest={
        "guestName":post["guestName"],
        "residentAddress":post["residentAddress"],
        "allowedStartTime":post["allowedStartTime"],
        "allowedEndTime":post["allowedEndTime"],
        "reason":post["reason"],
        "residentName":post["residentName"],
        "userName": userName
      }
    }
    else{
      let residentName = window.localStorage.getItem("residentName");
      let residentAddress = window.localStorage.getItem("residentAddress");
      this.guest={
        "guestName":post["guestName"],
        "residentAddress":residentAddress,
        "allowedStartTime":post["allowedStartTime"],
        "allowedEndTime":post["allowedEndTime"],
        "reason":post["reason"],
        "residentName":residentName,
        "userName":userName
      }
    }

    let jsonGuest=JSON.stringify(this.guest)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    if(this.image && this.isSecurity==false){
      this.imageSubmit();
    }

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/guest/add',jsonGuest,{headers: headersVar,responseType: "text"})
      .subscribe(() => {this.back();});
  }

  back(){
    this.location.back();
  }

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
    this.image=this.newImages[0];
  }

  imageSubmit(){
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "g"+this.guest.guestName+"-"+this.guest.residentAddress+"."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {});
   
  }
  sortDropdown(){
    this.residentNameSource.filter = this.formGroup.get("residentName").value.toLowerCase().trim();
    this.residentAddressSource.filter = this.formGroup.get("residentAddress").value.toLowerCase().trim();
  }

  memberFieldsFill(member){
    this.formGroup.get("residentName").setValue(member.memberName);
    this.formGroup.get("residentAddress").setValue(member.memberAddress);
    this.sortDropdown();
  }

  navigateMultipleGuests(){
    
  }
  
}
