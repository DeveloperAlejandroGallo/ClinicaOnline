import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistryComponent } from './component/registry/registry.component';
import { HomeComponent } from './component/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FireAuthService } from './service/fire-auth.service';
import { FireStoreService } from './service/fire-store.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ErrorComponent } from './component/error/error.component';
import { RecaptchaModule } from "angular-google-recaptcha";
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { PatientMenuComponent } from './component/patient/patient-menu/patient-menu.component';
import { ProfesionalMenuComponent } from './component/profesional/profesional-menu/profesional-menu.component';
import { AdminMenuComponent } from './component/admin/admin-menu/admin-menu.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AppointmentComponent } from './component/patient/appointment/appointment.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProfesionalListComponent } from './component/profesional/profesional-list/profesional-list.component';
// import { AppointmentListComponent } from './component/profesional/appointment-list/appointment-list.component';
import { SpecialityListComponent } from './component/speciality/speciality-list/speciality-list.component';
import { PatientAppointmentListComponent } from './component/patient/patient-appointment-list/patient-appointment-list.component';
import { ProfesionalAppointmentListComponent } from './component/profesional/profesional-appointment-list/profesional-appointment-list.component';
import { ProfesionalAppointmentComponent } from './component/profesional/profesional-appointment/profesional-appointment.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HeaderComponent } from './component/header/header.component';
import { ChangeColorDirective } from './service/change-color.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { AppointmentListComponent } from './component/appointment/appointment-list/appointment-list.component';
import { DaysOfAttentionComponent } from './component/days-of-attention/days-of-attention.component';
import { ApproveProfesionalComponent } from './component/admin/approve-profesional/approve-profesional.component';
import { AppointmentMenuComponent } from './component/appointment/appointment-menu/appointment-menu.component';
import { AppointmentDetailComponent } from './component/appointment/appointment-detail/appointment-detail.component';
import { FilterAppointmentPipe } from './pipes/filter-appointment.pipe';
import { FilterProfStatePipe } from './pipes/filter-prof-state.pipe';
import { FilterUserPipe } from "./pipes/filter-user.pipe";
import { UserListComponent } from "./component/user/user-list/user-list.component";
import { DatePipe } from '@angular/common';
import { HoursComponent } from './component/hours/hours.component';
import { SpecialityNewComponent } from './component/speciality/speciality-new/speciality-new.component';
import { SpecialityMenuComponent } from './component/speciality/speciality-menu/speciality-menu.component';
import { ProfesionalAgendaComponent } from './component/profesional/profesional-agenda/profesional-agenda.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    HomeComponent,
    ErrorComponent,
    UploadFileComponent,
    PatientMenuComponent,
    ProfesionalMenuComponent,
    AdminMenuComponent,
    UserProfileComponent,
    AppointmentComponent,
    ProfesionalListComponent,
    SpecialityListComponent,
    PatientAppointmentListComponent,
    ProfesionalAppointmentListComponent,
    ProfesionalAppointmentComponent,
    NavBarComponent,
    HeaderComponent,
    ChangeColorDirective,
    FilterPipe,
    AppointmentListComponent,
    DaysOfAttentionComponent,
    ApproveProfesionalComponent,
    AppointmentMenuComponent,
    AppointmentDetailComponent,
    FilterAppointmentPipe,
    FilterProfStatePipe,
    FilterUserPipe,
    UserListComponent,
    HoursComponent,
    SpecialityNewComponent,
    SpecialityMenuComponent,
    ProfesionalAgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot({siteKey:'6Lc9StwZAAAAAMj-93mWyO2jCbshJu9lsxxNJN8d'}),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [FireAuthService, FireStoreService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
