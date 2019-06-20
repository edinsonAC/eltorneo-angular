import { Component, OnInit } from '@angular/core';
import { Jugador } from './jugador';
import { ActivatedRoute, Router } from '@angular/router';
import { JugadorService } from './jugador.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  private jugador: Jugador = new Jugador();
  idEquipo: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jugadorService: JugadorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarJugador()
  }

  public cargarJugador() {
    console.log("llega a cargar jugador")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.idEquipo = params['idEquipo']
      console.log("llega a cargar JUGADOR con el id ", id)
      if (id) {
        this.jugadorService.buscarJugadorPorId(id).subscribe(
          (response) => {
            this.jugador = response
            console.log("el jugadir<>>>>>> ", this.jugador)
          }
        )
      }
    })
  }



  public crearJugador(): void {
    this.jugador.equipo.equiId = this.idEquipo;
      this.jugadorService.crearJugador(this.jugador).subscribe(
        (response) => {
          this.jugador = response;
          this.router.navigate(['/listJugadores', this.jugador.equipo.equiId])
          swal.fire('Nuevo jugador', `Jugador ${this.jugador.jugaNombre} se registró con éxito`, 'success')
        }
      )
  }

  public actualizarJugador(): void {
    this.jugadorService.actualizarJugador(this.jugador)
      .subscribe(
        respuesta => {
          this.router.navigate(['/listEquipo'])
          swal.fire('Jugador actualizado', `Jugador ${this.jugador.jugaNombre} actualizado con éxito`, 'success')
        }
      )
  }

}
