import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/app/componentes/usuario/usuario';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idTipoUsuarioGlobal: string;
  static readonly TOKEN_STORAGE_KEY = 'token';
  redirectToUrl: string = '/index';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private appComp: AppComponent
  ) { }

  public login(credentials: User): void {
    this.tokenService.getResponseHeaders(credentials)
      .subscribe((res: HttpResponse<any>) => {
        console.log("respuesta --< ", res);
        this.saveToken(res.headers.get('Authorization'));
        this.obtenerTipoUsuario();

        if (this.getTipo() == '1') {
          this.router.navigate(['/listTorneo']);
        }
        else if (this.getTipo() == '3') {
          this.router.navigate(['/listPartido']);
        } else {
          this.router.navigate(['/listEquipo']);

        }
      }
      )
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

    setTimeout(function () {
      location.reload();
    }, 500)
    //   
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public obtenerTipoUsuario(): String {
    let tipoUsuario: string;
    if (this.getToken() != null) {
      let tokenInfo = jwt_decode(this.getToken()); // decode token
      let expireDate = tokenInfo.exp; // get token expiration dateTime
      let tipoUsuario = tokenInfo.authorities[0];
      this.guardarTipoDeUsuarioGlobal(tipoUsuario);
    } else {
      tipoUsuario = "";
    }

    return tipoUsuario;
  }

  public guardarTipoDeUsuarioGlobal(tipo: String) {
    switch (tipo) {
      case 'administrador':
        this.idTipoUsuarioGlobal = "1";
        break;
      case 'tecnico':
        this.idTipoUsuarioGlobal = "2";
        break;
      case 'arbitro':
        this.idTipoUsuarioGlobal = "3";
        break;
    }
  }

  public getTipo(): string {
    this.guardarTipoDeUsuarioGlobal(this.obtenerTipoUsuario())
    return this.idTipoUsuarioGlobal;
  }
}