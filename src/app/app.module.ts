import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelToken } from './models/churchEntitieModels/ModelToken.models';
import { LoadingPageComponent } from './pages/shared/loading-page/loading-page.component';
import { MenusPageComponent } from './pages/shared/menus-page/menus-page.component';
import { HeadFrameComponent } from './pages/shared/head-frame/head-frame.component';
import { offeringRegisterPageComponent } from './pages/treasury/offering/offering-register-page/offering-registe-page.component';
import { OfferingReportPageComponent } from './pages/treasury/offering/offering-report-page/offering-report-page.component';
import { TithesRegisterPageComponent } from './pages/treasury/tithes/tithes-register-page/tithes-register-page.component';
import { TithesReportPageComponent } from './pages/treasury/tithes/tithes-report-page/tithes-report-page.component';
import { FirstFruitsRegisterPageComponent } from './pages/treasury/firstFruits/first-fruits-register-page/first-fruits-register-page.component';
import { FirstFruitsReportPageComponent } from './pages/treasury/firstFruits/first-fruits-report-page/first-fruits-report-page.component';
import { MemberRegisterPageComponent } from './pages/secretary/member/member-register-page/member-register-page.component';
import { configAplication } from './config/configAplication';
import { MemberReportPageComponent } from './pages/secretary/member/member-report-page/member-report-page.component';
import { LoadingFileComponent } from './pages/shared/loading-file/loading-file.component';
import { RegistersPageComponent } from './pages/shared/registers-page/registers-page.component';
import { OutflowRegisterPageComponent } from './pages/treasury/outflow/outflow-register-page/outflow-register-page.component';
import { OutflowReportPageComponent } from './pages/treasury/outflow/outflow-report-page/outflow-report-page.component';
import { ChurchRegisterPageComponent } from './pages/secretary/church/church-register-page/church-register-page.component';
import { ChurchReportPageComponent } from './pages/secretary/church/church-report-page/church-report-page.component';
import { MeetingRegisterPageComponent } from './pages/secretary/meeting/meeting-register-page/meeting-register-page.component';
import { MeetingHandler } from './handlers/meetingKindHandler';
import { MeetingReportPageComponent } from './pages/secretary/meeting/meeting-report-page/meeting-report-page.component';
import { PostRegisterPageComponent } from './pages/secretary/posts/post-register-page/post-register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    LoadingPageComponent,
    MenusPageComponent,
    HeadFrameComponent,
    offeringRegisterPageComponent,
    OfferingReportPageComponent,
    TithesRegisterPageComponent,
    TithesReportPageComponent,
    FirstFruitsRegisterPageComponent,
    FirstFruitsReportPageComponent,
    MemberRegisterPageComponent,
    MemberReportPageComponent,
    LoadingFileComponent,
    OutflowRegisterPageComponent,
    OutflowReportPageComponent,
    ChurchRegisterPageComponent,
    ChurchReportPageComponent,
    MeetingRegisterPageComponent,
    MeetingReportPageComponent,
    PostRegisterPageComponent
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
export class AppModule { 
  constructor(){
    configAplication.loadConfig();
  }
}
