import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolyoComponent } from './portfolyo/portfolyo.component';
import { MarketComponent } from './market/market.component';
import { SimulaorComponent } from './simulaor/simulaor.component';
import { SingleUnitPlatformComponent } from './single-unit-platform/single-unit-platform.component';
import { SingleUnitExistingComponent } from './single-unit-existing/single-unit-existing.component';
import { SimulatorScenariosComponent } from './simulator-scenarios/simulator-scenarios.component';

const routes: Routes = [
  { path: 'p', component: PortfolyoComponent },
  { path: 'aws', component: MarketComponent },
  { path: 'simulator', component: SimulaorComponent },
  { path: 'single_unit_simulator', component: SingleUnitPlatformComponent },
  { path: 'single_unit_existing', component: SingleUnitExistingComponent },
  { path: 'simulator2', component: SingleUnitExistingComponent },
  { path : '' , redirectTo : '/aws' , pathMatch: 'full' }
];

@NgModule({
  exports: [ RouterModule ],
imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
