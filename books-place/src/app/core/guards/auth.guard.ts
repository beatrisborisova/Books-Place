import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(state);
  }


  checkAuthentication(state: RouterStateSnapshot): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    };

    this.userService.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
