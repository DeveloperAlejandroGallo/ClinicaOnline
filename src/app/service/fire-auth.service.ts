import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router) { }

  public async signIn(email: string, pass: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  public async signOut() {
      await this.fireAuth.signOut();
      this.router.navigate(['/']);
  }

  public async register(email: string, pass: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }       
  
  closeSesion(){
    return this.fireAuth.signOut();
  }

  currentUser(){
    return this.fireAuth.currentUser;
  }

  
}
