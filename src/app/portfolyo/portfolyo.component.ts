import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-portfolyo',
  templateUrl: './portfolyo.component.html',
  styleUrls: ['./portfolyo.component.css']
})
export class PortfolyoComponent implements OnInit {

  constructor(private market: MarketService) { }
  account: any;
  ngOnInit() {
    this.account = this.market.getAccount();
  }

}
