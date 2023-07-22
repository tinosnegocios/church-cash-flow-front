import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HeadFrameComponent } from './pages/shared/head-frame/head-frame.component';
import { offeringRegisterPageComponent } from './pages/treasury/offering/offering-register-page/offering-registe-page.component';
import { TreasuryOfferingRelatoryPageComponent } from './pages/treasury/offering/treasury-offering-relatory-page/treasury-offering-relatory-page.component';
import { TithesRegisterPageComponent } from './pages/treasury/tithes/tithes-register-page/tithes-register-page.component';
import { TithesReportPageComponent } from './pages/treasury/tithes/tithes-report-page/tithes-report-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
   }, {
    path: 'login',
    component: LoginPageComponent
   },{
    path: 'dashboard',
    component: HeadFrameComponent,
    children: [
      { path: '', component: DashboardPageComponent }
    ]
   },{
    path: 'offering-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: offeringRegisterPageComponent },
    ]
   },{
    path: 'offering-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: TreasuryOfferingRelatoryPageComponent }
    ]
   },{
    path: 'tithes-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: TithesRegisterPageComponent }
    ]
   },{
    path: 'tithes-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: TithesReportPageComponent }
    ]
   } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }