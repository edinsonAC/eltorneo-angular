import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Equipo } from './equipo';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlGetEquipo: string = API_URL + '/equipo/buscarEquipo';
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


  listarEquipos(): Observable<Equipo[]> {
    //return this.http.get(API_URL + '/equipo/listarEquipos').pipe(
    return this.http.get(`${API_URL + '/equipo/listarEquipos'}/${this.auth.getTipo()}`).pipe(
      map(response => response as Equipo[])
    );
  }


  buscarEquipoPorId(id): Observable<Equipo> {
    return this.http.get(`${this.urlGetEquipo}/${id}`).pipe(
      map(response => response as Equipo)
    );
  }

  crearEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(API_URL + "/equipo/crearEquipo", equipo, { headers: this.httpHeaders })
  }

  actualizarEquipo(equipo: Equipo) {
    return this.http.put<Equipo>(`${this.urlGetEquipo}/${equipo.equiId}`, equipo, { headers: this.httpHeaders })
  }

}
