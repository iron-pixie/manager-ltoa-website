import { Component, OnInit } from '@angular/core';
import { TableUiInterfaceComponent } from '../table-ui-interface/table-ui-interface.component';
import { MatTableDataSource } from '@angular/material';
import { MessageService } from '../services/message-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'table-ui-workorder',
  templateUrl: './../table-ui-interface/table-ui-interface.component.html',
  styleUrls: ['./table-ui-workorder.component.css']
})

export class TableUiWorkorderComponent extends TableUiInterfaceComponent implements OnInit{
  subscription:Subscription;
  message;
  posts;
  tableType;
  checked;
  displayCheckBox:boolean;
  username;
  userLevel;

  constructor(private messageService: MessageService, private http:Http, private route: ActivatedRoute) {
    super();
    this.includeDetails=true;
    this.inputRouterString="/web/workorders/add";
    this.detailsRouterString="/web/workorders/details/"
    this.dataArray=[];
    this.posts=[];

    this.username = localStorage.getItem('username');
    this.userLevel = localStorage.getItem('userLevel');

    if(this.userLevel=="manager"){
      this.displayCheckBox = true;
    }
    else{
      this.displayCheckBox = false;
    }

    this.route.params.subscribe(params => {
      this.tableType = params['tableType'];
    });

    if(this.tableType=="all"){
      this.getAllWorkorders(http);
    }
    else if(this.tableType=="manager"){
      let manager = localStorage.getItem("username");
      this.getManagerWorkorders(http,manager);
    }
    else if(this.tableType=="user"){

    }
    else{
      throw Error("invalid url for workorders table");
    }
    

    this.columnNames=[
      "Work Order ID",
      "Responsible Manager",
      "Type",
      "Creation Date",
      "Status",
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

  getAllWorkorders(http:Http){
    http.get('https://d1jq46p2xy7y8u.cloudfront.net/work/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          this.dataArray.push(
            new workorder(
              data.workId,
              data.ResponsibleManager,
              data.workType,
              data.CreationDate,
              data.Status
            )
          )
        }
        this.keys = Object.keys(this.dataArray[0]);
        this.columnDef= Object.keys(this.dataArray[0]);
        this.columnDef.push('detailsButton');
      })

    this.dataSource = new MatTableDataSource(this.dataArray);
  }

  getManagerWorkorders(http:Http,manager:string){
    let body={"ResponsibleManager":manager};
    http.post('http://backend-ipt.us-west-2.elasticbeanstalk.com/work/manager-search/',body)
      .subscribe(response => {
        let dataResponse=null;
        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          this.dataArray.push(
            new workorder(
              data.workId,
              data.ResponsibleManager,
              data.workType,
              data.CreationDate,
              data.Status
            )
          )
        }
        this.keys = Object.keys(this.dataArray[0]);
        this.columnDef= Object.keys(this.dataArray[0]);
        this.columnDef.push('detailsButton');
      })

    this.dataSource = new MatTableDataSource(this.dataArray);
  }

}

class workorder{
  id:string;
  address:string;
  type:string;
  createDate:string;
  status:string;

  constructor(id,address,type,createDate,status){
    this.id=id;
    this.address=address;
    this.type=type;
    this.createDate=createDate;
    this.status=status
  }
}
