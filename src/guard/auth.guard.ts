import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let url: string = state.url;
        return this.checkLogin(url);
    }
    private checkLogin(url: string): boolean {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        this.authenticationService.redirectToUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}