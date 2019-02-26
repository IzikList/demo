import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolyoComponent } from './portfolyo/portfolyo.component';
import { MarketComponent } from './market/market.component';
import { SimulaorComponent } from './simulaor/simulaor.component';
import { SingleUnitPlatformComponent } from './single-unit-platform/single-unit-platform.component';
import { SingleUnit2Component } from './single-unit2/single-unit2.component';
import { SingleUnitExistingComponent } from './single-unit-existing/single-unit-existing.component';
import { SimulatorScenariosComponent } from './simulator-scenarios/simulator-scenarios.component';
import { SimulatorIvolvingLeComponent } from './simulator-ivolving-le/simulator-ivolving-le.component';
import { ReportComponent } from './clients/report/report.component';
import { MobileComponent } from './clients/mobile/mobile.component';
import { SplashComponent } from './splash/splash.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MarketNewComponent } from './market-new/market-new.component';
import { IndustryMapComponent } from './industry-map/industry-map.component';

const routes: Routes = [
  { path: 'p', component: PortfolyoComponent },
  { path: 'aws', component: MarketComponent },
  { path: 'simulator', component: SimulaorComponent },
  { path: 'single_unit_simulator', component: SingleUnitPlatformComponent },
  { path: 'single_unit_existing', component: SingleUnitExistingComponent },
  { path: 'single_unit_existing2', component: SingleUnit2Component },
  { path: 'simulator2', component: SimulatorScenariosComponent },
  { path: 'simulator3', component: SimulatorIvolvingLeComponent },
  { path: 'clients/report', component: ReportComponent },
  { path: 'clients/mobile', component: MobileComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'home/map', component: IndustryMapComponent },
  { path: 'home2', component: MarketNewComponent },
  { path : '' , redirectTo : '/aws' , pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
