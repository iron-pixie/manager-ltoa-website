import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'table-ui-interface',
  templateUrl: './table-ui-interface.component.html',
  styleUrls: ['./table-ui-interface.component.css']
})
export class TableUiInterfaceComponent implements OnInit {

  dataSource;
  dataArray;
  keys:any[];
  columnDef:any[];
  columnNames:string[];
  inputRouterString:string;
  detailsRouterString:string;
  image;
  includeDetails:boolean;
  displayAddButton=true;

  constructor() { 
  }

  ngOnInit() {
  }

}