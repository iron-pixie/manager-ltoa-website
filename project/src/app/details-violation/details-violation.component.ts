import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MessageService } from '../services/message-service.service';
import { Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import{ Location } from '@angular/common';
let parseString = require('xml2js').parseString;

@Component({
  selector: 'details-violation',
  templateUrl: './details-violation.component.html',
  styleUrls: ['./details-violation.component.css']
})

export class DetailsViolationComponent implements OnInit {

  id;
  formGroup: FormGroup;
  private sub: any;
  addressValue = "";
  dateValue = "";
  responsibleManagerValue = "";
  fineValue = ""; 
  notesValue = "";
  newImages:any=[];
  file=null;
  storedImages:any=[];
  numberOfImages;
  imageReadyToSubmit = true;
  displayEdit =true;
  initialData;

  private bucket = new S3(
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

  constructor(private route: ActivatedRoute, private messageService: MessageService, private http:Http, private location:Location, private httpC:HttpClient) { 
    let userLevel = localStorage.getItem('userLevel');
    if(userLevel==="resident"){
      this.displayEdit = false;
    }
    this.formGroup = new FormGroup({
      address:new FormControl(),
      type:new FormControl(),
      createDate:new FormControl(),
      status:new FormControl(),
      responsibleManager:new FormControl(),
      fine:new FormControl(),
      notes:new FormControl()
  })

  this.sub = this.route.params.subscribe(params => {
    this.id = params['id'];
  });

  this.getImages();

  this.http.get('https://d1jq46p2xy7y8u.cloudfront.net/violation/'+this.id)
    .subscribe(response=>{
      let data=response.json();
      this.initialData=data;
      this.addressValue=data.MemberAddress;
      this.dateValue=data.CreationDate;
      this.responsibleManagerValue=data.ResponsibleManager;
      this.fineValue=data.Fine;
      this.notesValue=data.Notes;
      this.formGroup.get("type").setValue(data.ViolationType);
      this.formGroup.get("status").setValue(data.Status);
      this.formGroup.get("createDate").disable();
      this.formGroup.get("type").disable();

      let userLevel = localStorage.getItem('userLevel');
      if(userLevel==="resident"){
        this.formGroup.disable()
      }
    });
}

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getImages(){
      var url = "https://s3-us-west-2.amazonaws.com/ipt-photo-bucket/";
      var photoName="v"+this.id
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

    this.updateDB(values);
  }

  updateDB(values){
    let body ={"ViolationId":values["id"]};
    
    if(values["address"]!==this.initialData.MemberAddress && values["address"]!==null){
      body["MemberAddress"] = values["address"];
    }

    if(values["status"]!==this.initialData.Status && values["status"]!==null){
      body["Status"] = values["status"];
    }

    if(values["responsibleManager"]!==this.initialData.ResponsibleManager && values["responsibleManager"]!==null){
      body["ResponsibleManager"] = values["responsibleManager"];
    }

    if(values["notes"]!==this.initialData.Notes && values["notes"]!==null){
      body["Notes"] = values["notes"];
    }

    if(values["fine"]!==this.initialData.Fine && values["fine"]!==null){
      body["Fine"] = values["fine"];
    }

    console.log(body);

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.httpC.post('https://d1jq46p2xy7y8u.cloudfront.net/violation/update',body,{headers: headersVar,responseType: "text"})
      .subscribe((res) => {
        this.back();
      });
  }
 
  delete(){
    this.http.delete('https://d1jq46p2xy7y8u.cloudfront.net/violation/'+this.id)
      .subscribe((response)=>{
        this.back();
      })
  }

  imageChange(fileInput){
    this.newImages= <Array<File>> fileInput.target.files;
    this.imageReadyToSubmit = false;
  }

  imageSubmit(){
     
    let fileType=this.newImages[0].name.split('.')[1];
    let newImageNumber = this.storedImages.length
 
    const params = {
      Bucket: 'ipt-photo-bucket',
      Key: "v"+this.id+newImageNumber+"."+fileType,
      Body: this.newImages[0],
      ACL:"public-read"
    };
     
    this.bucket.upload(params, function (err, data) {
    });
    this.file=null;
  }

  back(){
    let back = function(location):void{
      location.back();
    }
    setTimeout(back,2000,this.location);
  }

  backImmediately(){
    this.location.back();
  }


}

