import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Partido } from './partido';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  private urlGetPartido: string = API_URL + '/partido/buscarPartido';

  constructor(private http: HttpClient, private auth: AuthService) { }


  listarPartidos(): Observable<Partido[]> {
    return this.http.get(API_URL + '/partido/listarPartidos').pipe(
      map(response => response as Partido[])
    );
  }


  buscarPartidoPorId(id): Observable<Partido> {
    return this.http.get(`${this.urlGetPartido}/${id}`).pipe(
      map(response => response as Partido)
    );
  }

  crearPartido(torneo: Partido): Observable<Partido> {
    return this.http.post<Partido>(API_URL + "/partido/crearPartido", torneo, { headers: this.httpHeaders })
  }

  actualizarPartido(partido: Partido) {
    return this.http.put<Partido>(`${this.urlGetPartido}/${partido.partId}`, partido, { headers: this.httpHeaders })
  }


}
