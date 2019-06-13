import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/listarUsuarios';
  private urlLogin: string = 'http://localhost:8080/api/loguear';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  login(usuario: Usuario): Observable<Usuario> {
    us: Usuario;
    return this.http.post(this.urlLogin, usuario).pipe(
      map(response => response as Usuario)
    );
  }

}
