import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './component/admin/admin-menu/admin-menu.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PatientMenuComponent } from './component/patient/patient-menu/patient-menu.component';
import { ProfesionalMenuComponent } from './component/profesional/profesional-menu/profesional-menu.component';
import { RegistryComponent } from './component/registry/registry.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  {path:'**', pathMatch:'full', redirectTo: 'error'},
  {path:'', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registry', component: RegistryComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'profesional', component: ProfesionalMenuComponent},
  {path: 'patient', component: PatientMenuComponent},
  {path: 'admin', component: AdminMenuComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
