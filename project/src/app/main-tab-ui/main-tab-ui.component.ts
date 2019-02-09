import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-tab-ui',
  templateUrl: './main-tab-ui.component.html',
  styleUrls: ['./main-tab-ui.component.css']
})
export class MainTabUiComponent {

  constructor(private router:Router){}

  ngOnInit(){

    let username=localStorage.getItem("username");
    if(username!=null){
      let userLevel = localStorage.getItem('userLevel');
      this.router.navigate(['/web/home/'+userLevel])
    }
    else{
      this.router.navigate(['../login']);
    }
  }

  navigateHome(){
    let userLevel = localStorage.getItem('userLevel');
    this.router.navigate(['/web/home/'+userLevel])
  }
}
