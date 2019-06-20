import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/componentes/usuario/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};
const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  public getResponseHeaders(credentials: Usuario): Observable<any> {
    let loginUrl = API_URL + '/login';
    return this.http.post(loginUrl, credentials, httpOptions).pipe(
      catchError(e => {
        console.log("error --->>>", e);
        return throwError(e);
      })
    )
  }

  public logout() {
    let logoutUrl = API_URL + '/logout';
    return this.http.get(logoutUrl, { responseType: 'text' });
  }
}
