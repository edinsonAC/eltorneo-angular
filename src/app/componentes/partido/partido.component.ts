import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro';
import { ArbitroService } from '../arbitro/arbitro.service';
import { PartidoService } from './partido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from './partido';
import { ArbitroPartido } from '../arbitro/arbitroPartido';
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
  partido: Partido;
  torneo:Torneo = new Torneo();
  equipo1:Equipo = new Equipo();
  equipo2:Equipo = new Equipo();
  arbitroCentral: number = 0;
  arbitroAsistente1: number = 0;
  arbitroAsistente2: number = 0;

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
            console.log("llega ------>>>>>>>>>>", response)
          }
        )
      }
    })
  }

  public listarArbitros(): void {
    this.arbitroService.listarArbitros().
      subscribe(
        response => {
          console.log("respuesta arbittos---> ", response)
          this.arbitros = response
        });
  }


  public asignarArbitro(caso: string): void {
    let partidoArbitro: ArbitroPartido = new ArbitroPartido();
    console.log("opcion -->", caso)

    console.log("opcion seleccionada-->", this.arbitroCentral)


    switch (caso) {
      case '1':
        partidoArbitro.paarArbitroCentral = 1;
        partidoArbitro.arbitro.arbiId = this.arbitroCentral;
        break;
      case '2':
        partidoArbitro.paarArbitroCentral = 0;
        partidoArbitro.arbitro.arbiId = this.arbitroAsistente1;
        break;
      case '3':
        partidoArbitro.paarArbitroCentral = 0;
        partidoArbitro.arbitro.arbiId = this.arbitroAsistente1;
        break;
    }

    if (partidoArbitro.arbitro.arbiId != 0) {
      this.arbitroService.asignarArbitroPartido(partidoArbitro).
        subscribe(
          response => {
            // this.router.navigate(['/listTorneo'])
            partidoArbitro = response
            swal.fire('Asignación', `El arbitro ${partidoArbitro.arbitro.arbiNombre} ha sido asignado al partido`, 'success')
          }
        )
    } else {
      swal.fire('Asignación', 'seleccione un arbitro', 'error')
    }
  }
}
