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

  public async signIn(user: User) {
    return this.fireAuth.signInWithEmailAndPassword(user.email, user.pass);
  }

  public async signOut() {
      await this.fireAuth.signOut();
      this.router.navigate(['/']);
  }

  public async register(user: User) {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.pass);
  }              
}
