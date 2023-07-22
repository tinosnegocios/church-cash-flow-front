import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelToken } from './models/ModelToken.models';
import { LoadingPageComponent } from './pages/shared/loading-page/loading-page.component';
import { MenusPageComponent } from './pages/shared/menus-page/menus-page.component';
import { HeadFrameComponent } from './pages/shared/head-frame/head-frame.component';
import { offeringRegisterPageComponent } from './pages/treasury/offering/offering-register-page/offering-registe-page.component';
import { TreasuryOfferingRelatoryPageComponent } from './pages/treasury/offering/treasury-offering-relatory-page/treasury-offering-relatory-page.component';
import { TreasuryOfferingItemPageComponent } from './pages/treasury/offering/treasury-offering-item-page/treasury-offering-item-page.component';
import { TithesRegisterPageComponent } from './pages/treasury/tithes/tithes-register-page/tithes-register-page.component';
import { TithesReportPageComponent } from './pages/treasury/tithes/tithes-report-page/tithes-report-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    LoadingPageComponent,
    MenusPageComponent,
    HeadFrameComponent,
    offeringRegisterPageComponent,
    TreasuryOfferingRelatoryPageComponent,
    TreasuryOfferingItemPageComponent,
    TithesRegisterPageComponent,
    TithesReportPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
