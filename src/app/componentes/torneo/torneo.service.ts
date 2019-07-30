import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Torneo } from './torneo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../usuario/usuario';
import { AuthService } from 'src/app/auth/services/auth.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})


export class TorneoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlGetTorneo: string = API_URL + '/torneo/buscarTorneo';
  private urlSorteo: string = API_URL + '/torneo/sorteo';

  constructor(private http: HttpClient, private auth: AuthService) { }


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
    return this.http.post<Torneo>(API_URL + "/torneo/crearTorneo", torneo, { headers: this.httpHeaders })
  }

  actualizarTorneo(torneo: Torneo) {
    return this.http.put<Torneo>(`${this.urlGetTorneo}/${torneo.tornId}`, torneo, { headers: this.httpHeaders })
  }

  realizarSorteo(id): Observable<boolean> {
    return this.http.get(`${this.urlSorteo}/${id}`).pipe(
      map(response => response as boolean)
    );
  }

}
