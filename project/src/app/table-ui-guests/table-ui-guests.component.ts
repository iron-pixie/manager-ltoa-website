import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'table-ui-guests',
  templateUrl: './table-ui-guests.component.html',
  styleUrls: ['./table-ui-guests.component.css']
})
export class TableUiGuestsComponent implements OnInit {

  keys;
  columnNames;
  dataArray:Guest[]=[];
  dataSource;
  userLevel

  constructor(private http:HttpClient, private router:Router) { 
    this.columnNames = ["Guest Name","Start Date","End Date"];
    this.keys = ['guestName','allowedStartTime','allowedEndTime'];
    this.userLevel=window.localStorage.getItem("userLevel");

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/guest/all',{headers: headersVar})
      .subscribe(response => {
        let dataResponse=null;

        dataResponse=response;
        response=null;

        for(let data of dataResponse){
          data.allowedEndTime= data.allowedEndTime=="null"?"indefinite":data.allowedEndTime;
          this.dataArray.push(
            new Guest(
              data.guestName,
              data.residentAddress,
              data.allowedEndTime,
              data.allowedStartTime,
              "",
              data.reason,
              data.residentName
            )
          )
        }
        this.dataSource = new MatTableDataSource(this.dataArray); 
        let memberName = window.localStorage.getItem("residentName");
        if(this.userLevel=="resident"){
          this.dataSource.filter = memberName.trim().toLowerCase();
        }
      })
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  routeToAddGuest(){
    this.router.navigate(['/web/addGuest/']);
  }

  /*registerEntry(guest){
    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    let guestJSON = {
      "guestName":guest.guestName,
	    "residentName":guest.residentName,
	    "residentAddress":guest.residentAddress
    }
    this.http.post('https://d1jq46p2xy7y8u.cloudfront.net/register',guestJSON,{headers: headersVar,responseType: "text"})
      .subscribe(response => {
      })

  }*/

  deleteGuest(guest){
    this.http.delete('https://d1jq46p2xy7y8u.cloudfront.net/guest/delete/'+guest.guestName,{responseType: "text"})
      .subscribe((response)=>{ })
  }

}

class Guest{
  guestName:string;
  residentAddress:string;
  allowedEndTime:string;
  allowedStartTime:string;
  mostRecentEntry:string;
  residentName:string;
  reason:string;

  constructor(guestName,residentAddress,allowedEndTime,allowedStartTime,mostRecentEntry,reason,residentName){
    this.guestName=guestName;
    this.residentAddress=residentAddress;
    this.allowedEndTime = allowedEndTime;
    this.allowedStartTime = allowedStartTime;
    this.mostRecentEntry = mostRecentEntry;
    this.residentName = residentName;
    this.reason = reason;
  }
}
