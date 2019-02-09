import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  data=null;

  constructor(private http:HttpClient) {
    let memberName = window.localStorage.getItem("residentName");

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    let jsonPayload = {
      "memberName":memberName
    }

    http.post('https://d1jq46p2xy7y8u.cloudfront.net/member/search',jsonPayload,{headers: headersVar})
      .subscribe(response => {
        this.data=response;
      })
  }

  ngOnInit() {
  }

}
