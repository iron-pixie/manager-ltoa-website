import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table-approve-user',
  templateUrl: './table-approve-user.component.html',
  styleUrls: ['./table-approve-user.component.css']
})
export class TableApproveUserComponent implements OnInit {
  columnNames=[];
  keys=[];
  dataArray=[];
  dataSource;
  focusedData=null;
  focusedInt;
  approvalStatus;
  inApproval=true;
  readyToApprove=false;

  constructor(private http:HttpClient, private router:Router) { 
    this.columnNames = ["Guest Name","Start Date","End Date"];
    this.keys = ['guestName','allowedStartTime','allowedEndTime'];

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/pending-users',{headers: headersVar})
      .subscribe(response => {
        let dataResponse=null;

        dataResponse=response;
        response=null;

        for(let data of dataResponse){
          data.allowedEndTime= data.allowedEndTime=="null"?"indefinite":data.allowedEndTime;
          this.dataArray.push(
            {
              Name:data.Name,
              userName:data.userName             
            }
          )
        }
        this.dataSource = new MatTableDataSource(this.dataArray); 
        let memberName = window.localStorage.getItem("residentName");
      })
  }

  ngOnInit() {
  }

  approveRegistration(){
    this.approvalStatus="Approved";
    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    let approvalJSON = {
      "Name":this.focusedData.Name,
      "userName":this.focusedData.userName
    }
    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/accept-user',approvalJSON,{headers: headersVar,responseType: "text"})
      .subscribe(response => {
        this.inApproval=false;
        this.dataArray.splice(this.focusedInt,1);
        setTimeout(()=>{ this.readyToApprove=false;}, 1500);
      })
  }

  disapproveRegistration(){
    this.approvalStatus="Denied";
    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    let disapprovalJSON = {
      "Name":this.focusedData.Name,
    }
    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/deny-user',disapprovalJSON,{headers: headersVar,responseType: "text"})
      .subscribe(response => {
        this.inApproval=false;
        this.dataArray.splice(this.focusedInt,1);
        setTimeout(()=>{ this.readyToApprove=false;}, 1500);
      })
  }

  checkApproval(i){
    this.focusedData=this.dataArray[i];
    this.focusedInt=i;
    this.readyToApprove=true;
    this.inApproval=true;

  }
}