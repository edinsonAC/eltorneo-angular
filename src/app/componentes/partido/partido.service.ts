import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Partido } from './partido';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PartidoArbitro } from '../arbitro/arbitroPartido';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  private urlGetPartido: string = API_URL + '/partido/buscarPartido';

  constructor(private http: HttpClient, private auth: AuthService) { }


  listarPartidos(idTorneo): Observable<Partido[]> {
    return this.http.get(`${API_URL + '/partido/listarPartidos'}/${idTorneo}`).pipe(
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

  actualizarPartido(partido: Partido, fecha:string) {
    return this.http.put<Partido>(`${this.urlGetPartido}/${partido.partId}/${fecha}`, partido, { headers: this.httpHeaders })
  }


  buscarArbitroCentralPorPartido(id): Observable<PartidoArbitro> {
    return this.http.get(`${API_URL + "/partido/buscarArbitroAsignado"}/${id}`).pipe(
      map(response => response as PartidoArbitro)
    );
  }

  buscarArbitroAsistentesPorPartido(id): Observable<PartidoArbitro[]> {
    return this.http.get(`${API_URL + "/partido/buscarArbitroAsistente"}/${id}`).pipe(
      map(response => response as PartidoArbitro[])
    );
  }


  actualizarArbitroPartido(arbitro: PartidoArbitro) {
    return this.http.put<PartidoArbitro>(`${API_URL + "/partido/buscarArbitroAsignado"}/${arbitro.paarId}`, arbitro, { headers: this.httpHeaders })
  }

}
