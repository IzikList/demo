import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolyoComponent } from './portfolyo/portfolyo.component';
import { MarketComponent } from './market/market.component';

const routes: Routes = [
  { path: 'p', component: PortfolyoComponent },
  { path: 'aws', component: MarketComponent }
];

@NgModule({
  exports: [ RouterModule ],
imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
