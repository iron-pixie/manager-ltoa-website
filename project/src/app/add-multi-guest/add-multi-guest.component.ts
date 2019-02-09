import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-multi-guest',
  templateUrl: './add-multi-guest.component.html',
  styleUrls: ['./add-multi-guest.component.css']
})
export class AddMultiGuestComponent implements OnInit {
  formGroup;
  tryRemoveLast=false;
  constructor(private http:HttpClient,private router:Router) {
    this.formGroup = new FormGroup({
      guestArray: new FormArray([
        new FormControl(""),
        new FormControl(""),
        new FormControl("")
      ]),
      date: new FormControl(""),
      reason: new FormControl("")
    });
   }

  ngOnInit() {
    
  }

  addToGuestArray(){
    this.formGroup.get("guestArray").push(new FormControl(""));
  }

  removeFromGuestArray(index){
    if(this.formGroup.get("guestArray").length>1){
      this.formGroup.get("guestArray").removeAt(index);
    }
    else{
      this.tryRemoveLast=true;
      setTimeout(()=>{this.tryRemoveLast=false;},2000);
    }
  } 

  submit(formGroup:FormGroup){
    let residentName = window.localStorage.getItem("residentName");
    let residentAddress = window.localStorage.getItem("residentAddress");
    let userName=window.localStorage.getItem("username");
    let metadata ={
      userName: userName,
      residentName: residentName,
      residentAddress: residentAddress,
      reason: formGroup.get("reason").value,
      allowedStartTime: formGroup.get("date").value,
      allowedEndTime: formGroup.get("date").value,
    }
    let guestArray=formGroup.get("guestArray").value;
    let jsonReturn=[];
    jsonReturn.push(metadata);
    for(let i=0;i<guestArray.length;i++){
      jsonReturn.push({guestName:guestArray[i]});
    }
    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/guest/add-group',JSON.stringify(jsonReturn),{headers: headersVar,responseType: "text"})
      .subscribe((res) => {this.router.navigate(['/web/addGuest'])});
  }

}
