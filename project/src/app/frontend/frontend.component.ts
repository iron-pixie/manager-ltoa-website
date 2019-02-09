import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {

  keys:String[];
  columnDef:String[];

  statuses = [
    {value:"pending",viewValue:"pending"},
    { value:"complete",viewValue:"complete"}
  ]

  types =[
    {value:"Traffic violations",viewValue:"Traffic violations"},
    {value:"Trashcan violations",viewValue:"Trashcan violations"}
  ]


  date1 = new Date('December 17, 1995').toUTCString();
  violationArray=[
    new violation(0,"rez","a",this.date1,"p"),
    new violation(1,"rey","b",this.date1,"c"),
    new violation(2,"rex","c",this.date1,"c"),
    new violation(3,"rew","d",this.date1,"p"),
    new violation(4,"rev","e",this.date1,"c"),
  ];

  violationForm = new FormGroup({
    address:new FormControl(),
    type:new FormControl(),
    createDate:new FormControl(),
    status:new FormControl()
  })

  violationSource = new MatTableDataSource(this.violationArray);

  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.violationArray[0]);
    this.columnDef= Object.keys(this.violationArray[0]);
    this.columnDef.push('detailsButton');
  }

  detailsClick(violation){
  }

  submit(form){
    let newID=this.violationArray[this.violationArray.length-1].id+1;
    let values=form.value;
    let newViolation = new violation(
      newID,
      values.address,
      values.type,
      values.createDate,
      values.status);

    this.violationArray.push(newViolation); 
    this.violationSource=new MatTableDataSource(this.violationArray);
    
    //add to the database
  }
}

class violation{
  id:number;
  address:string;
  type:string;
  createDate:Date;
  status:string;

  constructor(id,address,type,createDate,status){
    this.id=id;
    this.address=address;
    this.type=type;
    this.createDate=createDate;
    this.status=status
  }
}
