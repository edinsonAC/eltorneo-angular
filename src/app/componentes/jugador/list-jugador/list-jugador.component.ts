import { Component, OnInit } from '@angular/core';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-jugador',
  templateUrl: './list-jugador.component.html',
  styleUrls: ['./list-jugador.component.css']
})
export class ListJugadorComponent implements OnInit {
  jugadores: Jugador[];
  constructor(
    private jugadorService: JugadorService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listarJugadoresPorEquipo()
  }

  public listarJugadoresPorEquipo() {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      console.log("llega a cargar jugadores con el id ", id)
      if (id) {
        this.jugadorService.listarJugadoresPorEquipo(id).subscribe(
          (response) => this.jugadores = response
        )
      }
    })
  }

}
