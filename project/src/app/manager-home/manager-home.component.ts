import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { MatTableDataSource } from '@angular/material';
import { WSAEINVALIDPROVIDER } from 'constants';

@Component({
  selector: 'manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
  drop=false;
  groupInfo=[];
  groupIdNames=["violationId","workorderId","actionId"];
  groupTypeNames=["violationType","workorderType","actionType"];
  groupRoutes=["/web/violations/details/","/web/workorders/details/","/web/tickets/details/"];
  groupLabels=["Violations","Workorders","Tickets"]
  username;

  Keys=["Id","Type","Details"]

  constructor(private router:Router,private http:Http) { 
    this.username = localStorage.getItem("username");
    this.getInProgressViolation();
    this.getInProgressWorkorder();
    this.getInProgressTicket();
  }

  ngOnInit() {
    if(window.innerWidth >= 1000){
      this.drop = !this.drop;

    }

  }

  dropdown(){
    this.drop = !this.drop;
  }
  dropit(){
    if(window.innerWidth >= 1000){
      this.drop = true;

    }
    else{
      this.drop = !this.drop;
    }
    
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('residentName');
    localStorage.removeItem('residentAddress');
    this.router.navigate(['../login']);
  }

  navigate(navigationString){
    this.router.navigate([navigationString]);
  }

  getInProgressViolation(){
    this.http.get('https://d1jq46p2xy7y8u.cloudfront.net/violation/all')
      .subscribe(response => {
        let dataArray=[]
        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          dataArray.push(
            new violation(
              data.ViolationId,
              data.MemberAddress,
              data.ViolationType,
              data.CreationDate,
              data.Status,
              data.ResponsibleManager
            )
          )
        }
        this.groupInfo[0] = new MatTableDataSource(dataArray);
        this.groupInfo[0].filterPredicate = function(data,username): boolean{
          let nameBool = data.responsibleManager.toLowerCase().trim().includes(username);
          let dataBool = data.status.toLowerCase().trim().includes("complete");
          return nameBool && !dataBool; 
        }
        this.groupInfo[0].filter = this.username;
      })
  }

  getInProgressWorkorder(){
    this.http.get('https://d1jq46p2xy7y8u.cloudfront.net/work/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;
        let dataArray=[];
        for(let data of dataResponse){
          dataArray.push(
            new workorder(
              data.workId,
              data.Address,
              data.workType,
              data.CreationDate,
              data.Status,
              data.ResponsibleManager
            )
          )
        }
        this.groupInfo[1] = new MatTableDataSource(dataArray);
        this.groupInfo[1].filterPredicate = function(data,username): boolean{
          let nameBool = data.responsibleManager.toLowerCase().trim().includes(username);
          let dataBool = data.status.toLowerCase().trim().includes("complete");
          return nameBool && !dataBool; 
        }
        this.groupInfo[1].filter = this.username;

      })
  }

  getInProgressTicket(){
    this.http.get('https://d1jq46p2xy7y8u.cloudfront.net/action/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;
        let dataArray=[];
        for(let data of dataResponse){
          dataArray.push(
            new ticket(
              data.actionId,
              data.actionType,
              data.CreationDate,
              data.Status,
              data.ResponsibleManager,
            )
          )
        }
        this.groupInfo[2] = new MatTableDataSource(dataArray);
        this.groupInfo[2].filterPredicate = function(data,username): boolean{
          let nameBool = data.responsibleManager.toLowerCase().trim().includes(username);
          let dataBool = data.status.toLowerCase().trim().includes("complete");
          return nameBool && !dataBool; 
        }
        this.groupInfo[2].filter = this.username;
        
      })
  }
}

class ticket{
  id:string;
  type:string;
  createDate:string;
  status:string;
  responsibleManager:string;

  constructor(id,type,createDate,status,responsibleManager){
    this.id=id;
    this.type=type;
    this.createDate=createDate;
    this.status=status
    this.responsibleManager=responsibleManager;
  }
}

class violation{
  id:string;
  responsibleManager:string;
  address:string;
  type:string;
  createDate:string;
  status:string;

  constructor(id,address,type,createDate,status,responsibleManager){
    this.id=id;
    this.address=address;
    this.type=type;
    this.createDate=createDate;
    this.status=status;
    this.responsibleManager=responsibleManager;
  }
}

class workorder{
  id:string;
  address:string;
  type:string;
  createDate:string;
  status:string;
  responsibleManager:string;

  constructor(id,address,type,createDate,status,responsibleManager){
    this.id=id;
    this.address=address;
    this.type=type;
    this.createDate=createDate;
    this.status=status
    this.responsibleManager=responsibleManager;
  }
}