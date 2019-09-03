import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolyoComponent } from './portfolyo/portfolyo.component';
import { SplashComponent } from './splash/splash.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IndustryMapComponent } from './industry-map/industry-map.component';
import { MyPolicyComponent } from './my-policy/my-policy.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'p', component: PortfolyoComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'home/map', component: IndustryMapComponent },
  { path: 'home/mypolicy', component: MyPolicyComponent },
  { path: 'home/login', component: LoginPageComponent },
  { path: 'home/registration', component: RegistrationComponent },
  { path : '' , component: HomepageComponent },
];

@NgModule({
  exports: [ RouterModule ],
imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
