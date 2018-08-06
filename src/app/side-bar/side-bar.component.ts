import { Component, OnInit } from '@angular/core';
import { MENU_ITEM } from './side-bar-menu';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items = MENU_ITEM;
  account: any;
  constructor(private ms: MarketService) { }

  ngOnInit() {
    this.account = this.ms.getAccount();
  }

}
