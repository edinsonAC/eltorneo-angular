import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthService } from '../app/auth/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let currentUser = this.authenticationService.currentUserValue;
        //   if (currentUser && currentUser.token) {
        //         request = request.clone({
        //   setHeaders: { 
        //       Authorization: `Bearer ${currentUser.token}`
        ///      }
        //    });
        //  }
        //    return next.handle(request);
        //  }


        let interceptedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        return next.handle(interceptedRequest).pipe(catchError(x => this.handleErrors(x)));

    }

    private handleErrors(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.auth.redirectToUrl = this.router.url;
            this.router.navigate(['/login']);
            return of(err.message);
        }
    }
}