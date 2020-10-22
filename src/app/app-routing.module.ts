import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistryComponent } from './component/registry/registry.component';

const routes: Routes = [
  {path:'**', pathMatch:'full', redirectTo: 'error'},
  {path:'', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registry', component: RegistryComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
