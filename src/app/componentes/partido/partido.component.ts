import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro';
import { ArbitroService } from '../arbitro/arbitro.service';
import { PartidoService } from './partido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from './partido';
import { PartidoArbitro } from '../arbitro/arbitroPartido';
import { Torneo } from '../torneo/torneo';
import swal from 'sweetalert2'
import { Equipo } from '../equipo/equipo';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  arbitros: Arbitro[];
  partido: Partido = new Partido();
  partidoArbitroCentral: PartidoArbitro = new PartidoArbitro();
  partidoArbitro1: PartidoArbitro = new PartidoArbitro();
  partidoArbitro2: PartidoArbitro = new PartidoArbitro();
  torneo: Torneo = new Torneo();
  equipo1: Equipo = new Equipo();
  equipo2: Equipo = new Equipo();
  arbitroCentral: Arbitro = new Arbitro();
  arbitroAsistente1: Arbitro = new Arbitro();
  arbitroAsistente2: Arbitro = new Arbitro();


  constructor(
    private arbitroService: ArbitroService,
    private partidoService: PartidoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarArbitros()
    this.cargarPartido()

  }


  public cargarPartido() {
    console.log("llega a cargar partido")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log("llega a cargar partido con el id ", id)
      if (id) {
        this.partidoService.buscarPartidoPorId(id).subscribe(
          (response) => {
            this.partido = response
            this.torneo = this.partido.torneo
            this.equipo1 = this.partido.equipo1
            this.equipo2 = this.partido.equipo2
            this.cargarArbitroCentral(this.partido.partId)
            this.listarArbitrosAsistentes(this.partido.partId)
            console.log("llega ------>>>>>>>>>>", response)
          }
        )
      }
    })
  }

  public cargarArbitroCentral(id): void {
    this.partidoService.buscarArbitroCentralPorPartido(id).subscribe(
      (response) => {
        if (response != null) {
          this.partidoArbitroCentral = response
          this.arbitroCentral = this.partidoArbitroCentral.arbitro
          console.log("llega ------>>>>>>>>>>", response)
        }

      }
    )
  }

  public listarArbitrosAsistentes(id): void {
    this.partidoService.buscarArbitroAsistentesPorPartido(id).
      subscribe(
        response => {
          console.log("respuesta arbittos asistentes---> ", response)
          if (response != null && response.length > 0) {
            this.partidoArbitro1 = response[0]
            this.arbitroAsistente1 = this.partidoArbitro1.arbitro
            this.partidoArbitro2 = response[1]
            this.arbitroAsistente2 = this.partidoArbitro2.arbitro
          }

        });
  }

  public listarArbitros(): void {
    this.arbitroService.listarArbitros().
      subscribe(
        response => {
          console.log("respuesta arbittos---> ", response)
          this.arbitros = response
        });
  }


  public asignarArbitroCentral(): void {

    if (this.arbitroCentral.arbiId != 0) {
      this.partidoArbitroCentral.paarArbitrocentral = 1;
      this.partidoArbitroCentral.arbitro = this.arbitroCentral
      this.partidoArbitroCentral.partido = this.partido
      this.arbitroService.asignarArbitroPartido(this.partidoArbitroCentral).
        subscribe(
          response => {
            // this.router.navigate(['/listTorneo'])
            swal.fire('Asignación', `El arbitro ha sido asignado al partido`, 'success')
          }
        )
    } else {
      swal.fire('Asignación', 'seleccione un arbitro', 'error')
    }
  }

  public asignarArbitro1(): void {

    if (this.arbitroAsistente1.arbiId != 0) {
      this.partidoArbitro1.paarArbitrocentral = 0;
      this.partidoArbitro1.partido = this.partido
      this.partidoArbitro1.arbitro = this.arbitroAsistente1
      this.arbitroService.asignarArbitroPartido(this.partidoArbitro1).
        subscribe(
          response => {
            // this.router.navigate(['/listTorneo'])
            swal.fire('Asignación', `El arbitro ha sido asignado al partido`, 'success')
          }
        )
    } else {
      swal.fire('Asignación', 'seleccione un arbitro', 'error')
    }
  }


  public asignarArbitro2(): void {

    if (this.arbitroAsistente2.arbiId != 0) {
      this.partidoArbitro2.paarArbitrocentral = 0;
      this.partidoArbitro2.partido = this.partido
      this.partidoArbitro2.arbitro = this.arbitroAsistente2
      this.arbitroService.asignarArbitroPartido(this.partidoArbitro2).
        subscribe(
          response => {
            // this.router.navigate(['/listTorneo'])
            swal.fire('Asignación', `El arbitro  ha sido asignado al partido`, 'success')
          }
        )
    } else {
      swal.fire('Asignación', 'seleccione un arbitro', 'error')
    }
  }

  public actualizarPartido(): void {

    this.partidoService.actualizarPartido(this.partido, this.partido.partFecha)
      .subscribe(
        respuesta => {
          //this.router.navigate(['/listEquipo'])
          swal.fire('Partido actualizado', `Partido actualizado con éxito`, 'success')
        }
      )
  }

}
