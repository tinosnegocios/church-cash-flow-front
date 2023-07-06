import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HeadFrameComponent } from './pages/shared/head-frame/head-frame.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

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
      {
        path: '',
        component: DashboardPageComponent
      }
    ]
   },{
    path: 'register',
    component: HeadFrameComponent,
    children: [
      {
        path: '',
        component: RegisterPageComponent
      }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
