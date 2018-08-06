import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { MarketOverviewComponent } from './market-overview/market-overview.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChartComponent, MarketOverviewComponent]
})
export class MarketModule { }
