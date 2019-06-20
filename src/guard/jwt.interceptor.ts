import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthService } from '../app/auth/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let interceptedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        console.log("el interceptor ", interceptedRequest)
        return next.handle(interceptedRequest).pipe(catchError(x => this.handleErrors(x)));

    }

    private handleErrors(err: HttpErrorResponse): Observable<any> {
        console.log("el handler ", err)
        if (err.status === 401) {
            console.log("entra aal if interceptor", err.message)
            this.auth.redirectToUrl = this.router.url;
            swal.fire('Error de autenticación', '', 'error')
            this.router.navigate(['/login']);
            //location.reload();
            return of(err.message);
        }
    }
}