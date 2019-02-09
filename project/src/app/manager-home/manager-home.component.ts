import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  constructor(private router:Router) { 
    let username = localStorage.getItem("username");
  }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('residentName');
    localStorage.removeItem('residentAddress');
    this.router.navigate(['../login']);
  }

}
