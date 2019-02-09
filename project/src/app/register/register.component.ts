import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  failure=false;

  userLevel = [
    {value:"manager",viewValue:"manager"},
    { value:"resident",viewValue:"resident"},
    { value:"security",viewValue:"security"}
  ]

  constructor(private http:HttpClient, private router:Router, private location:Location) {
    this.formGroup = new FormGroup({
      name:new FormControl('',[Validators.required]),
      userLevel:new FormControl('',[Validators.required]),
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      memberAddress:new FormControl('',[Validators.required]),
      contactNumber:new FormControl('',[]),
      email:new FormControl('',[Validators.email])
    });
    this.formGroup.get("email").markAsDirty
    this.formGroup.get("contactNumber").markAsDirty
  }

  ngOnInit() {
  }

  tryRegister(form){

    if(this.formGroup.get("name").dirty && 
      this.formGroup.get("userLevel").dirty && 
      this.formGroup.get("userName").dirty &&
      this.formGroup.get("password").dirty){
    let input = form.value;
    let register={
      "Name":input["name"],
      "userLevel":input["userLevel"],
      "userName":input["userName"],
      "Password":input["password"]
    };
    let jsonRegister=JSON.stringify(register)

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/login/add',jsonRegister,{headers: headersVar,responseType: "text"})
      .subscribe((res) => {
        if(res.toString().includes("ERROR")){
        }
        else{
          let memberRegister={
            "memberName":input["name"],
            "memberAddress":input["memberAddress"],
            "contactNumber":input["contactNumber"],
            "email":input["email"]
          }

          this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/member/add',memberRegister,{headers: headersVar,responseType: "text"})
            .subscribe((res) => {
              if(res.toString().includes("ERROR")){
              }
              else{
                this.router.navigate(['/login']);
              }
            });
        }
      });
    }
    else{
      this.failure =true;
    }
  }

  back(){
    this.location.back();
  }

}
