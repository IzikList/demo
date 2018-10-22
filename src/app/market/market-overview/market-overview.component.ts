import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit {
  marketData = [
    {key: 'AVG. LE', val: '6.8'},
    {key: 'AVG. FACE VALUE', val: '$950K'},
    {key: 'NUMBER OF POLICIES', val: '8462'},
    {key: 'AVG. PREMIUS', val: '3.6', valNonModel: '%'}];

  constructor() { }

  ngOnInit() {
  }

  getVal(key) {
    for (let i = 0; i < this.marketData.length; i++) {
      const element = this.marketData[i];
      if (element.key === key) {
        return element.val;
      }
    }
  }

}
