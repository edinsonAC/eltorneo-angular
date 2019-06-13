import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Torneo } from './torneo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class TorneoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlGetTorneo: string = API_URL + '/torneo/buscarTorneo';

  constructor(private http: HttpClient) { }


  listarTorneos(): Observable<Torneo[]> {
    return this.http.get(API_URL + '/torneo/listarTorneos').pipe(
      map(response => response as Torneo[])
    );
  }


  buscarTorneoPorId(id): Observable<Torneo> {
    return this.http.get(`${this.urlGetTorneo}/${id}`).pipe(
      map(response => response as Torneo)
    );
  }

  crearTorneo(torneo: Torneo): Observable<Torneo> {
    return this.http.post<Torneo>(API_URL + "/crearTorneo", torneo, { headers: this.httpHeaders })
  }

  actualizarTorneo(torneo: Torneo) {
    return this.http.put<Torneo>(`${this.urlGetTorneo}/${torneo.tornId}`, torneo, { headers: this.httpHeaders })
  }

}
