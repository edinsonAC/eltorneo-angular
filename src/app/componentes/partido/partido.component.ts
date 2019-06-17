import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro';
import { ArbitroService } from '../arbitro/arbitro.service';
import { PartidoService } from './partido.service';
import { ActivatedRoute } from '@angular/router';
import { Partido } from './partido';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  arbitros: Arbitro[];
  partido: Partido;
  constructor(
    private arbitroService: ArbitroService,
    private partidoService: PartidoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listarArbitros()
   
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
            console.log("llega ------>>>>>>>>>>",response)
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
          this.cargarPartido()
        });
  }
}
