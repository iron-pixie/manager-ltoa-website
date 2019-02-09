import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'input-ui-violation',
  templateUrl: './../input-ui-violation/input-ui-violation.component.html',
  styleUrls: ['./input-ui-violation.component.css']
})
export class InputUiViolationComponent {

  formGroup:FormGroup;
  tableClass;
  serverUrl;
  routingString:string;
  img;
  newImages=null;

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

  constructor(private messageService: MessageService, private http:HttpClient, private location:Location) {
    this.routingString="/violations"
    this.formGroup = new FormGroup({
      address:new FormControl('',[
        Validators.required,
      ]),
      type:new FormControl('',[
        Validators.required
      ]),
      status:new FormControl('',[
        Validators.required,
      ]),
      responsibleManager:new FormControl('',[
        Validators.required,
      ]),
      fine:new FormControl('',[]),
      notes:new FormControl('',[])
    });
   }

  ngOnInit() {
  }

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
  }

  imageSubmit(id){
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "v"+id+"0."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {});
   
  }

  sendMessage(message): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage("input",message);
  }

  createPost(input :HTMLInputElement){
  
    let face={
      "Status":input["status"],
      "ViolationType":input["type"],
      "MemberAddress":input["address"],
      "Fine":input["fine"],
      "ResponsibleManager":input["responsibleManager"],
      "Notes":input["notes"],
      "userName":window.localStorage.getItem("username")
    }

    let jsonFace=JSON.stringify(face)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    let options = {
      headers: headersVar
    }

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/violation/add',jsonFace,{headers: headersVar})
      .subscribe((val) => {
        if(this.newImages!=null){
          this.imageSubmit(val["id"]);
        }
        this.back();
      });
  }

  saveFile(image){
    this.img=image;
  }

  submit(form){
    let values=form.value;

    values.image=this.img;

    form.reset();

    this.createPost(values);
  } 

  back(){
    this.location.back();
  }

  /*imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
  }

  imageSubmit(){

    const bucket = new S3(
      {
        accessKeyId: 'AKIAJXK7O6II5KS4X4WQ',
        secretAccessKey: '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',
        region: 'us-west-2'
      }
    );
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "v"+this.id+"."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    bucket.upload(params, function (err, data) {
      if(err){
      }
    });
   
  }*/
}
