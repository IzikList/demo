import { Component, OnInit } from '@angular/core';
import { MENU_ITEM } from './side-bar-menu';
import { MarketService } from '../market.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items = MENU_ITEM;
  account: any;
  opened: Boolean = false;
  constructor(private ms: MarketService, private router: Router) {
      router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('event.url ' + event.url);
        if (event['url'].includes('/clients/') || event['url'].includes('/splash') || event['url'].includes('/home') ) {
          this.opened = false;
        } else {
          this.opened = true;
        }
        this.opened = false;
      }
    });

   }

  ngOnInit() {
    this.account = this.ms.getAccount();
  }
  itemClick(item) {
    if (item.url) {
      this.router.navigate(['/' + item.url]);
    }
  }

}
