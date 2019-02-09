import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-home',
  templateUrl: './security-home.component.html',
  styleUrls: ['./security-home.component.css']
})
export class SecurityHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToRegisterEntry(){
    this.router.navigate(['/web/registerEntry/'])
  }

  navigateToAddGuest(){
    this.router.navigate(['/web/addGuest/'])
  }

  navigateToRecentEntries(){
    this.router.navigate(['/web/entries/'])
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('residentName');
    localStorage.removeItem('residentAddress');    
    this.router.navigate(['../login']);
  }

}
