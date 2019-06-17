import { Injectable } from '@angular/core';
import { Jugador } from './jugador';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs/operators';

const API_URL_JUGADOR = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlGetTorneo: string = API_URL_JUGADOR + '/buscarJugador';

  constructor(private http: HttpClient, private auth: AuthService) { }


  listarJugadoresPorEquipo(idEquipo): Observable<Jugador[]> {
    return this.http.get(`${API_URL_JUGADOR + '/jugador/listarJugadores'}/${idEquipo}`).pipe(
      map(response => response as Jugador[])
    );
  }


  buscarJugadorPorId(id): Observable<Jugador> {
    return this.http.get(`${this.urlGetTorneo}/${id}`).pipe(
      map(response => response as Jugador)
    );
  }

  crearJugador(torneo: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(API_URL_JUGADOR + "/crearJugador", torneo, { headers: this.httpHeaders })
  }

  actualizarJugador(jugador: Jugador) {
    return this.http.put<Jugador>(`${this.urlGetTorneo}/${jugador.jugaId}`, jugador, { headers: this.httpHeaders })
  }

}
