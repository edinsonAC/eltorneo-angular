import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpResponse } from '@angular/common/http';
import { Usuario } from 'src/app/componentes/usuario/usuario';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/index';

  constructor(private router: Router, private tokenService: TokenService) { }

  public login(credentials: Usuario): void {
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res: HttpResponse<any>) => {
        console.log("respuesta --< ", res);
        this.saveToken(res.headers.get('Authorization'));
        this.router.navigate([this.redirectToUrl]);
      });
  }

  private saveToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }


  public logout(): void {
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  //  public logout(): void {
  //    this.tokenService.logout()
  //      .subscribe(() => {
  //       localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
  //      });
  //  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public obtenerTipoUsuario(): String {
    let tokenInfo = jwt_decode(this.getToken()); // decode token
    let expireDate = tokenInfo.exp; // get token expiration dateTime
    let tipoUsuario = tokenInfo.authorities[0]
    return tipoUsuario;
  }
}