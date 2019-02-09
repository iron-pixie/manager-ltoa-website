import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-home',
  templateUrl: './resident-home.component.html',
  styleUrls: ['./resident-home.component.css']
})
export class ResidentHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToAddGuest(){
    this.router.navigate(['/web/addGuest/']);
  }

  navigateToProfile(){
    this.router.navigate(['/web/profile/']);
  }

  navigateToViolation(){
    this.router.navigate(["/web/violations"]);
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('residentName');
    localStorage.removeItem('residentAddress');
    this.router.navigate(['../login']);
  }
}
