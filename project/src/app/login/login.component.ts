import { Component,Output } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFinished = false;
  loginError = false;
  userLoggedIn="";

  formGroup: FormGroup;

  constructor(private http:HttpClient, private router:Router) {
    this.formGroup = new FormGroup({
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
  }

  tryLogin(input :HTMLInputElement){
    let login={
      "username":input["userName"],
      "password":input["password"]
    };

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    let options = {
      headers: headersVar
    }

    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/login',login,options)
      .subscribe((res) => {
        let resString=res['Auth'];
        if(resString.includes("ERROR")){
          this.loginError=true;
        }
        else{
          this.loginError=false;
          this.loginFinished=true;
          this.userLoggedIn=input["userName"];
          window.localStorage.setItem("username",input["userName"]);
          let userLevel = res["userLevel"];
          window.localStorage.setItem("userLevel",userLevel);
          window.localStorage.setItem("residentName",res["memberName"]);
          window.localStorage.setItem("residentAddress",res["memberAddress"]);
          this.router.navigate(['/web/home/'+userLevel]);
        }
      });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
