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
import { TextareaExpandedComponent } from './numinput/test';
import { NgModelBaseComponent } from './numinput/NgModelBase';

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
  MatTreeModule
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
    // NuminputComponent,
    TextareaExpandedComponent,
    NgModelBaseComponent,
    PortfolyoComponent,
    NumpcComponent,
    SimulaorComponent,
    SeekbarComponent,
    SingleUnitPlatformComponent,
    SingleUnitExistingComponent,
    SimulatorScenariosComponent
  ],
  entryComponents: [DialogComponent, AttmarketDialogComponent],
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
