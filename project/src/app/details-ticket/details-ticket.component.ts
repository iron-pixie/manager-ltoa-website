import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
let parseString = require('xml2js').parseString;

@Component({
  selector: 'details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.css']
})

export class DetailsTicketComponent implements OnInit {

  id;
  formGroup: FormGroup;
  private sub: any;
  addressValue = "";
  dateValue = "";
  responsibleManagerValue = "";
  fineValue = ""; 
  notesValue = "";
  newImages:any=[];
  storedImages:any=[""];
  imageReadyToSubmit = true;

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

  constructor(private route: ActivatedRoute, private messageService: MessageService, private http: Http, private location:Location) { 
    this.formGroup = new FormGroup({
      address:new FormControl(),
      type:new FormControl(),
      createDate:new FormControl(),
      associatedParties:new FormControl(),
      status:new FormControl(),
      responsibleManager:new FormControl(),
      notes:new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });

   this.getImages();

    this.http.get('https://d1jq46p2xy7y8u.cloudfront.net/action/'+this.id)
    .subscribe(response=>{
      let data=response.json();
      this.dateValue=data.CreationDate;
      this.responsibleManagerValue=data.ResponsibleManager;
      this.notesValue=data.Notes;
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getImages(){
    var url = "https://s3-us-west-2.amazonaws.com/ipt-photo-bucket/";
    var photoName="a"+this.id
    this.http.get(url).subscribe((response)=>{
      let arrayOfImages=[];
      parseString(response['_body'], function (err, result) {
        let photosArray=result.ListBucketResult.Contents
        for(let i=0;i<photosArray.length;i++){
          if(photosArray[i].Key[0].indexOf(photoName)>-1){
            arrayOfImages.push(url+photosArray[i].Key);
          }
        }
      });
      this.storedImages=arrayOfImages;
    })
}

  submit(form){
    let values=form.value;

    form.reset();

    values["id"]=this.id;

    this.messageService.sendMessage("details",values);
    //push data to server
  }

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
    this.imageReadyToSubmit = false;
  }

  imageSubmit(){
     
    let fileType=this.newImages[0].name.split('.')[1];
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "a"+this.id+"."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {});
   
  }

  delete(){
    this.http.delete('https://d1jq46p2xy7y8u.cloudfront.net/action/'+this.id)
      .subscribe(()=>{this.back()})
  }

  back(){
    this.location.back();
  }

}
