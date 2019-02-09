import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './services/http-interceptor';

import { AppComponent } from './app.component';
import { UilayerComponent } from './uilayer/uilayer.component';
import { FrontendComponent } from './frontend/frontend.component';
import { TableUiInterfaceComponent } from './table-ui-interface/table-ui-interface.component';
import { InputUiViolationComponent } from './input-ui-violation/input-ui-violation.component';
import { TableUiViolationComponent } from './table-ui-violation/table-ui-violation.component';
import { MessageService} from './services/message-service.service'
import { MdComponentsModule} from './modules/md-components.module';
import { MainTabUiComponent } from './main-tab-ui/main-tab-ui.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { DetailsViolationComponent } from './details-violation/details-violation.component';
import { TableUiWorkorderComponent } from './table-ui-workorder/table-ui-workorder.component';
import { TableUiTicketComponent } from './table-ui-ticket/table-ui-ticket.component';
import { InputUiWorkorderComponent } from './input-ui-workorder/input-ui-workorder.component';
import { InputUiTicketComponent } from './input-ui-ticket/input-ui-ticket.component';
import { DetailsWorkorderComponent } from './details-workorder/details-workorder.component';
import { DetailsTicketComponent } from './details-ticket/details-ticket.component';
import { LoginComponent } from './login/login.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { RegisterComponent } from './register/register.component';
import { SecurityHomeComponent } from './security-home/security-home.component';
import { ResidentHomeComponent } from './resident-home/resident-home.component';
import { AddGuestComponent } from './add-guest/add-guest.component';
import { TableUiGuestsComponent } from './table-ui-guests/table-ui-guests.component';
import { TableUiEntryComponent } from './table-ui-entry/table-ui-entry.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { RegisterEntryComponent } from './register-entry/register-entry.component';
import { DisplayGuestsComponent } from './display-guests/display-guests.component';
import { AddMultiGuestComponent } from './add-multi-guest/add-multi-guest.component';
import { TableApproveUserComponent } from './table-approve-user/table-approve-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UilayerComponent,
    FrontendComponent,
    TableUiInterfaceComponent,
    InputUiViolationComponent,
    InputUiWorkorderComponent,
    InputUiTicketComponent,
    TableUiViolationComponent,
    TableUiWorkorderComponent,
    TableUiTicketComponent,
    MainTabUiComponent,
    NotFoundComponent,
    HomeComponent,
    DetailsViolationComponent,
    DetailsTicketComponent,
    DetailsWorkorderComponent,
    LoginComponent,
    ManagerHomeComponent,
    RegisterComponent,
    SecurityHomeComponent,
    ResidentHomeComponent,
    AddGuestComponent,
    TableUiGuestsComponent,
    TableUiEntryComponent,
    MemberProfileComponent,
    RegisterEntryComponent,
    DisplayGuestsComponent,
    AddMultiGuestComponent,
    TableApproveUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '',redirectTo:'web',pathMatch: "full"},
      {path: 'web', component:MainTabUiComponent, children:[
        {path: 'home/manager', component: ManagerHomeComponent},
        {path: 'home/security', component: SecurityHomeComponent},
        {path: 'home/resident', component: ResidentHomeComponent},
        {path: 'violations/add', component: InputUiViolationComponent},
        {path: 'workorders/add', component: InputUiWorkorderComponent},
        {path: 'tickets/add', component: InputUiTicketComponent},
        {path: 'violations/details/:id', component: DetailsViolationComponent},
        {path: 'workorders/details/:id', component: DetailsWorkorderComponent},
        {path: 'tickets/details/:id', component: DetailsTicketComponent},
        {path: 'violations', component: TableUiViolationComponent},
        {path: 'workorders/:tableType', component: TableUiWorkorderComponent},
        {path: 'tickets', component: TableUiTicketComponent},
        {path: 'addGuest', component: AddGuestComponent},
        {path: 'addMultiGuest', component: AddMultiGuestComponent},
        {path: 'guests', component: TableUiGuestsComponent},
        {path: 'entries',component: TableUiEntryComponent},
        {path: 'profile',component: MemberProfileComponent},
        {path: 'registerEntry',component: RegisterEntryComponent},
        {path: 'approveUser', component: TableApproveUserComponent}
      ]},
      {path: 'login', component: LoginComponent},
      {path: 'register',component: RegisterComponent},
      {path: '**', component: NotFoundComponent},
    ]),

    MdComponentsModule,
    
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
