import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/listarUsuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

}
