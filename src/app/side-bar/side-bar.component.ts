import { Component, OnInit } from '@angular/core';
import { MENU_ITEM } from './side-bar-menu';
import { MarketService } from '../market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items = MENU_ITEM;
  account: any;
  constructor(private ms: MarketService, private router: Router) { }

  ngOnInit() {
    this.account = this.ms.getAccount();
  }
  itemClick(item) {
    if (item.url) {
      this.router.navigate(['/' + item.url]);
    }
  }

}
