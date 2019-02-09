import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'table-ui-entry',
  templateUrl: './table-ui-entry.component.html',
  styleUrls: ['./table-ui-entry.component.css']
})
export class TableUiEntryComponent implements OnInit {

  keys;
  columnNames;
  dataArray:any[]=[];
  dataSource;

  constructor(private http:HttpClient, private router:Router) { 
    this.columnNames = ["Guest Name","Resident Address","Resident Name","Time of entry"];
    this.keys = ['guestName','residentAddress','residentName','entryTime'];

    let headersVar = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    http.get('https://d1jq46p2xy7y8u.cloudfront.net/register/all',{headers: headersVar})
      .subscribe(response => {
        let dataResponse=null;

        dataResponse=response;
        response=null;

        

        for(let data of dataResponse){
          this.dataArray.push(data);
        }
        this.dataSource = new MatTableDataSource(this.dataArray);
        let sort: MatSort = new MatSort;
        this.dataSource.sort=sort;
        sort.sort({
          id: "entryTime",
          start: 'desc'
        }as MatSortable);
      })
  }

  ngOnInit(){
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
