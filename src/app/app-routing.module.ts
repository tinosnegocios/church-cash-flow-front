import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HeadFrameComponent } from './pages/shared/head-frame/head-frame.component';
import { offeringRegisterPageComponent } from './pages/treasury/offering/offering-register-page/offering-registe-page.component';
import { OfferingReportPageComponent } from './pages/treasury/offering/offering-report-page/offering-report-page.component';
import { TithesRegisterPageComponent } from './pages/treasury/tithes/tithes-register-page/tithes-register-page.component';
import { TithesReportPageComponent } from './pages/treasury/tithes/tithes-report-page/tithes-report-page.component';
import { FirstFruitsRegisterPageComponent } from './pages/treasury/firstFruits/first-fruits-register-page/first-fruits-register-page.component';
import { FirstFruitsReportPageComponent } from './pages/treasury/firstFruits/first-fruits-report-page/first-fruits-report-page.component';
import { MemberRegisterPageComponent } from './pages/secretary/member/member-register-page/member-register-page.component';
import { MemberReportPageComponent } from './pages/secretary/member/member-report-page/member-report-page.component';
import { OutflowRegisterPageComponent } from './pages/treasury/outflow/outflow-register-page/outflow-register-page.component';
import { OutflowReportPageComponent } from './pages/treasury/outflow/outflow-report-page/outflow-report-page.component';
import { ChurchRegisterPageComponent } from './pages/secretary/church/church-register-page/church-register-page.component';
import { ChurchReportPageComponent } from './pages/secretary/church/church-report-page/church-report-page.component';

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
      { path: '', component: OfferingReportPageComponent }
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
   },{
    path: 'first-fruits-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: FirstFruitsRegisterPageComponent }
    ]
   },{
    path: 'first-fruits-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: FirstFruitsReportPageComponent }
    ]
   },{
    path: 'member-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: MemberRegisterPageComponent }
    ]
   },{
    path: 'member-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: MemberReportPageComponent }
    ]
   },{
    path: 'outflow-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: OutflowRegisterPageComponent }
    ]
   },{
    path: 'outflow-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: OutflowReportPageComponent }
    ]
   },{
    path: 'church-register',
    component: HeadFrameComponent,
    children: [
      { path: '', component: ChurchRegisterPageComponent }
    ]
   },{
    path: 'church-report',
    component: HeadFrameComponent,
    children: [
      { path: '', component: ChurchReportPageComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }