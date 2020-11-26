import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireAuthService } from './fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private autentica: FireAuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const url: string = state.url;
      
      return this.isLogged(url);
  }
  
  public isLogged(url: string): boolean {
    if (this.autentica.isLoggedIn )
      return true;
      
    this.autentica.redirectUrl = url;
    this.router.navigate(['/error']);
    return false;
  }
}
