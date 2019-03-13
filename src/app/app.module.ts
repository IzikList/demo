import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MarketComponent } from './market/market.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { InvestingComponent } from './market/investing/investing.component';
import { MarketOverviewComponent } from './market/market-overview/market-overview.component';
import { CommandsComponent } from './market/commands/commands.component';
import { ChartComponent } from './market/chart/chart.component';
import { DialogComponent } from './market/investing/investing.component';
import { AttmarketDialogComponent } from './market/investing/investing.component';
import { PremiumsDialogComponent } from './single-unit-existing/single-unit-existing.component';
import { DialogLeComponent } from './single-unit-existing/single-unit-existing.component';
import { DialogCameraComponent } from './clients/report/report.component';
import { TextareaExpandedComponent } from './numinput/test';
import { NgModelBaseComponent } from './numinput/NgModelBase';
import { SlideshowModule } from 'ng-simple-slideshow';


import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { PortfolyoComponent } from './portfolyo/portfolyo.component';
import { NumpcComponent } from './numpc/numpc.component';
import { SimulaorComponent } from './simulaor/simulaor.component';
import { SeekbarComponent } from './seekbar/seekbar.component';
import { SingleUnitPlatformComponent } from './single-unit-platform/single-unit-platform.component';
import { SingleUnitExistingComponent } from './single-unit-existing/single-unit-existing.component';
import { SimulatorScenariosComponent } from './simulator-scenarios/simulator-scenarios.component';
import { SimulatorScenarioInvestingComponent } from './simulator-scenario-investing/simulator-scenario-investing.component';
import { SingleUnit2Component } from './single-unit2/single-unit2.component';
import { SimulatorIvolvingLeComponent } from './simulator-ivolving-le/simulator-ivolving-le.component';
import { Base1Component } from './simulators/base1/base1.component';
import { CashFlowComponent } from './simulators/cash-flow/cash-flow.component';
import { PocSimulatorComponent } from './simulators/poc-simulator/poc-simulator.component';
import { InvLeComponent } from './utils/inv-le/inv-le.component';
import { ReportComponent } from './clients/report/report.component';
import { ChartCanvasComponent } from './clients/report/chart-canvas/chart-canvas.component';
import { SplashComponent } from './splash/splash.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { MobileComponent } from './clients/mobile/mobile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MarketNewComponent } from './market-new/market-new.component';
import { InvestComponent } from './market-new/invest/invest.component';
import { BarComponent } from './homepage/bar/bar.component';
import { IndustryMapComponent } from './industry-map/industry-map.component';
import { DotsCaruselComponent } from './dots-carusel/dots-carusel.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
// import { NuminputComponent } from './numinput/numinput.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MarketComponent,
    CommandsComponent,
    MarketOverviewComponent,
    InvestingComponent,
    ChartComponent,
    DialogComponent,
    AttmarketDialogComponent,
    PremiumsDialogComponent,
    DialogLeComponent,
    // NuminputComponent,
    TextareaExpandedComponent,
    NgModelBaseComponent,
    PortfolyoComponent,
    NumpcComponent,
    SimulaorComponent,
    SeekbarComponent,
    SingleUnitPlatformComponent,
    SingleUnitExistingComponent,
    SimulatorScenariosComponent,
    SimulatorScenarioInvestingComponent,
    SingleUnit2Component,
    SimulatorIvolvingLeComponent,
    Base1Component,
    CashFlowComponent,
    PocSimulatorComponent,
    InvLeComponent,
    ReportComponent,
    ChartCanvasComponent,
    SplashComponent,
    CustomInputComponent,
    MobileComponent,
    DialogCameraComponent,
    HomepageComponent,
    MarketNewComponent,
    InvestComponent,
    BarComponent,
    IndustryMapComponent,
    DotsCaruselComponent,
    InteractiveMapComponent
  ],
  entryComponents: [DialogComponent, AttmarketDialogComponent, PremiumsDialogComponent, DialogLeComponent, DialogCameraComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    SlideshowModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ]
})
export class AppModule { }
