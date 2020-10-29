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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    HomeComponent,
    ErrorComponent,
    UploadFileComponent
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
    HttpClientModule
  ],
  providers: [FireAuthService, FireStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
