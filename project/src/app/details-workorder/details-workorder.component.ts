import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { Http } from '@angular/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Location } from '@angular/common';
let parseString = require('xml2js').parseString;

@Component({
  selector: 'details-workorder',
  templateUrl: './details-workorder.component.html',
  styleUrls: ['./details-workorder.component.css']
})

export class DetailsWorkorderComponent implements OnInit {

  id;
  formGroup: FormGroup;
  private sub: any;
  newImages:any=[];
  addressValue = "";
  dateValue = "";
  responsibleManagerValue = "";
  fineValue = ""; 
  notesValue = "";
  storedImages:any=[""];
  imageReadyToSubmit = true;
  imagesToDelete:any=[];

  status = [
    {value:"pending",viewValue:"pending"},
    { value:"complete",viewValue:"complete"}
  ]

  type =[
    {value:"Traffic violations",viewValue:"Traffic violations"},
    {value:"Trashcan violations",viewValue:"Trashcan violations"}
  ]

  constructor(private route: ActivatedRoute, private messageService: MessageService, private http:Http,private location: Location) { 

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

    this.http.get('http://backend-ipt.us-west-2.elasticbeanstalk.com/work/'+this.id)
    .subscribe(response=>{
      let data=response.json();
      this.addressValue=data.MemberAddress;
      this.dateValue=data.CreationDate;
      this.responsibleManagerValue=data.ResponsibleManager;
      this.fineValue=data.Fine;
      this.notesValue=data.Notes;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
   });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getImages(){
    var url = "https://s3-us-west-2.amazonaws.com/ipt-photo-bucket/";
      var photoName="w"+this.id
      this.http.get(url).subscribe((response)=>{
        let arrayOfImages=[];
        let imgNamesArray = [];
        parseString(response['_body'], function (err, result) {
          let photosArray=result.ListBucketResult.Contents;
          for(let i=0;i<photosArray.length;i++){
            if(photosArray[i].Key[0].indexOf(photoName)>-1){
              arrayOfImages.push(url+photosArray[i].Key);
              imgNamesArray.push({Key:String(photosArray[i].Key)});
            }
          }
        });
        this.imagesToDelete = imgNamesArray;
        this.storedImages=arrayOfImages;
      })
  };

  submit(form){
    let values=form.value;

    form.reset();

    values["id"]=this.id;

    this.messageService.sendMessage("details",values);

    this.back();
  }

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
    this.imageReadyToSubmit = false; 
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
      Key: "w"+this.id+"."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    bucket.upload(params, function (err, data) {});
   
  }

  delete(){
    this.http.delete('https://d1jq46p2xy7y8u.cloudfront.net/work/'+this.id)
      .subscribe(()=>{
        this.deletePhotos();
        this.back()
      })
  }

  deletePhotos(){
    const bucket = new S3(
      {
        accessKeyId: 'AKIAJXK7O6II5KS4X4WQ',
        secretAccessKey: 'w8oCJntUf01ZS02pVAhCxojZO8AqFJQr4FeRtnql',
        region: 'us-west-2'
      }
    );

    var params = {
      Bucket: "examplebucket", 
      Delete: {
       Objects: this.imagesToDelete,
       Quiet: false
      }
    };

    bucket.deleteObjects(params, function(err, data) { 
    });
  }

  back(){
    this.location.back();
  }
}
