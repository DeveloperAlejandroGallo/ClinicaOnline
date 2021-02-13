import { animation } from '@angular/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './component/admin/admin-menu/admin-menu.component';
import { ApproveProfesionalComponent } from './component/admin/approve-profesional/approve-profesional.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PatientMenuComponent } from './component/patient/patient-menu/patient-menu.component';
import { ProfesionalAppointmentComponent } from './component/profesional/profesional-appointment/profesional-appointment.component';
import { ProfesionalMenuComponent } from './component/profesional/profesional-menu/profesional-menu.component';
import { RegistryComponent } from './component/registry/registry.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { LoggedInGuard } from './service/logged-in.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'registry', component: RegistryComponent, data: { animation: 'registry' } },
  { path: 'home', component: HomeComponent, data: { animation: 'home' }, canActivate: [LoggedInGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [LoggedInGuard] },
  { path: 'profesional', component: ProfesionalMenuComponent, canActivate: [LoggedInGuard] },
  { path: 'patient', component: PatientMenuComponent },
  { path: 'admin', component: AdminMenuComponent },
  { path: 'admin/approve', component: ApproveProfesionalComponent },
  { path: 'profesional/attend', component: ProfesionalAppointmentComponent },
  // { path: 'profesional/calendario', component: Profe },
  { path: 'error', component: ErrorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
