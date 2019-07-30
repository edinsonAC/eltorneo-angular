import { Injectable } from '@angular/core';
import { User } from './usuario';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/listarUsuarios';
  private urlLogin: string = 'http://localhost:8080/api/loguear';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as User[])
    );
  }

  login(usuario: User): Observable<User> {
    us: User;
    return this.http.post(this.urlLogin, usuario).pipe(
      map(response => response as User)
    );
  }

}
