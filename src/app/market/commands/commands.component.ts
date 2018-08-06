import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../market.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {
  asks: any;
  bids: any;

  constructor(private marketService: MarketService) {
  }

  ngOnInit() {
    this.asks = this.marketService.data.data.asks;
    this.bids = this.marketService.data.data.bids;
  }

}
