import { Component, OnInit } from '@angular/core';
import { TableUiInterfaceComponent } from '../table-ui-interface/table-ui-interface.component';
import { MatTableDataSource } from '@angular/material';
import { MessageService } from '../services/message-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';

@Component({
  selector: 'table-ui-violation',
  templateUrl: './../table-ui-interface/table-ui-interface.component.html',
  styleUrls: ['./table-ui-violation.component.css']
})

export class TableUiViolationComponent extends TableUiInterfaceComponent implements OnInit{
  subscription:Subscription;
  message;
  posts;
  checked;
  username;
  userLevel;
  displayCheckBox=false;

  constructor(private messageService: MessageService, private http:Http) {
    super();
    this.includeDetails=true;
    this.inputRouterString="/web/violations/add";
    this.detailsRouterString="/web/violations/details/";
    this.dataArray=[];
    this.posts=[];
    this.username = localStorage.getItem('username');
    this.userLevel = localStorage.getItem('userLevel');
    if(this.userLevel==="resident"){
      this.displayAddButton = false;
    }

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/violation/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          this.dataArray.push(
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
        this.keys = Object.keys(this.dataArray[0]);
        this.columnDef= Object.keys(this.dataArray[0]);
        this.columnDef.push('detailsButton');

        this.dataSource = new MatTableDataSource(this.dataArray);

        if(this.userLevel=="manager"){
          this.displayCheckBox = true;
        }
        else{
          this.applyFilter();
        }
      })

    this.columnNames=[
      "Violation ID",
      "Address",
      "Type",
      "Creation Date",
      "Status",
      "Responsible Manager"
    ]
  }

  filterCheckBox(){
    
    if(!this.checked){
      this.dataSource.filter = this.username;
    }
    else{
      this.dataSource.filter = "";
    }
  }

  applyFilter(){
    let residentAddress = window.localStorage.getItem("residentAddress");
    this.dataSource.filter = residentAddress;
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
