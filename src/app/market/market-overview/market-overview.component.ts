import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit {
  marketData = [
    {key: 'Avg', val: '18%'},
    {key: 'Avg', val: '18%'},
    {key: 'Avg', val: '18%'},
    {key: 'Avg', val: '18%'},
    {key: 'Avg', val: '18%'},
    {key: 'Avg', val: '18%'}];

  constructor() { }

  ngOnInit() {
  }

}
