import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

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
import { SeekbarComponent } from './seekbar/seekbar.component';
import { InvLeComponent } from './utils/inv-le/inv-le.component';
import { SplashComponent } from './splash/splash.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BarComponent } from './homepage/bar/bar.component';
import { IndustryMapComponent } from './industry-map/industry-map.component';
import { MyPolicyComponent } from './my-policy/my-policy.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { PolicyForecastComponent } from './policy-forecast/policy-forecast.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CompleteDialogComponent } from './registration/complete-dialog/complete-dialog.component';
// import { NuminputComponent } from './numinput/numinput.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TextareaExpandedComponent,
    NgModelBaseComponent,
    PortfolyoComponent,
    NumpcComponent,
    SeekbarComponent,
    InvLeComponent,
    SplashComponent,
    CustomInputComponent,
    HomepageComponent,
    BarComponent,
    IndustryMapComponent,
    MyPolicyComponent,
    LoginPageComponent,
    RegistrationComponent,
    PolicyForecastComponent,
    AboutPageComponent,
    CompleteDialogComponent,
  ],
  entryComponents: [
    CompleteDialogComponent
    ],
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
