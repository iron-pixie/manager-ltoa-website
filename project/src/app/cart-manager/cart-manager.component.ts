import { Component, OnInit } from '@angular/core';
import { TableUiInterfaceComponent } from '../table-ui-interface/table-ui-interface.component';
import { MatTableDataSource } from '@angular/material';
import { MessageService } from '../services/message-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-manager',
  templateUrl: './cart-manager.component.html',
  styleUrls: ['./cart-manager.component.css']
})
export class CartManagerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  moveToAddCart(){
    this.router.navigate(['/web/cartManager/add']);
  }
}
