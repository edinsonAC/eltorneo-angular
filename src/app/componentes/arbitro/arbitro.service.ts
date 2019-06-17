import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Arbitro } from './arbitro';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ArbitroService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlGetArbitro: string = API_URL + '/arbitro/buscarArbitro';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  listarArbitros(): Observable<Arbitro[]> {
    return this.http.get(API_URL + '/arbitro/listarArbitros').pipe(
      //  return this.http.get(`${API_URL + '/arbitro/listarArbitros'}/${this.auth.getTipo()}`).pipe(
      map(response => response as Arbitro[])
    );
  }


  buscarArbitroPorId(id): Observable<Arbitro> {
    return this.http.get(`${this.urlGetArbitro}/${id}`).pipe(
      map(response => response as Arbitro)
    );
  }

  crearArbitro(arbitro: Arbitro): Observable<Arbitro> {
    return this.http.post<Arbitro>(API_URL + "/arbitro/crearArbitro", arbitro, { headers: this.httpHeaders })
  }

  actualizarArbitro(arbitro: Arbitro) {
    return this.http.put<Arbitro>(`${this.urlGetArbitro}/${arbitro.arbiId}`, arbitro, { headers: this.httpHeaders })
  }

}
