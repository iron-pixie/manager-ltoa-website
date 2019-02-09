import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'input-ui-ticket',
  templateUrl: './../input-ui-ticket/input-ui-ticket.component.html',
  styleUrls: ['./input-ui-ticket.component.css']
})
export class InputUiTicketComponent{

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
    this.routingString="/tickets"
    this.formGroup = new FormGroup({
      address:new FormControl(),
      type:new FormControl(),
      status:new FormControl()
    });
   }

  ngOnInit() {
  }

  sendMessage(message): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage("input",message);
  }

  imageSubmit(id){
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "a"+id+"0."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {});
   
  }

  createPost(input :HTMLInputElement){
    let post =input;
  
    let face={
      "Status":post["status"],
      "actionType":post["type"],
      "ResponsibleManager":"testyMctesttest",
      "Notes":post["notes"],
      "userName":window.localStorage.getItem("username")
    }

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/action/add',face,{headers: headersVar})
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
