import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/componentes/usuario/usuario';



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

  public getResponseHeaders(credentials: Usuario) {
    let loginUrl = API_URL + '/login';
    return this.http.post(loginUrl, credentials, httpOptions);
  }

  public logout() {
    let logoutUrl = API_URL + '/logout';
    return this.http.get(logoutUrl, { responseType: 'text' });
  }
}
