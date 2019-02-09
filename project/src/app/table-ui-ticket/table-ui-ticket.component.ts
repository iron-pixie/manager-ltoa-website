import { Component} from '@angular/core';
import { TableUiInterfaceComponent } from '../table-ui-interface/table-ui-interface.component';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';

@Component({
  selector: 'table-ui-ticket',
  templateUrl: './../table-ui-interface/table-ui-interface.component.html',
  styleUrls: ['./table-ui-ticket.component.css']
})

export class TableUiTicketComponent extends TableUiInterfaceComponent{
  subscription:Subscription;
  checked;
  displayCheckBox:boolean;
  username;
  userLevel;

  constructor(private http:Http) {
    super();
    this.includeDetails=true;
    this.inputRouterString="/web/tickets/add";
    this.detailsRouterString="/web/tickets/details/"
    this.dataArray=[];
    this.username = localStorage.getItem('username');
    this.userLevel = localStorage.getItem('userLevel');


    if(this.userLevel=="manager"){
      this.displayCheckBox = true;
    }
    else{
      this.displayCheckBox = false;
    }

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/action/all')
      .subscribe(response => {

        let dataResponse=null;

        dataResponse=response.json()
        response=null;

        for(let data of dataResponse){
          this.dataArray.push(
            new ticket(
              data.actionId,
              data.ResponsibleManager,
              data.actionType,
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

    this.columnNames=[
      "Action ID",
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

}

class ticket{
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
