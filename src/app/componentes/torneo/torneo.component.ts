import { Component, OnInit } from '@angular/core';
import { Torneo } from './torneo';
import { TorneoService } from './torneo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  private torneo: Torneo = new Torneo();

  constructor(
    private torneoService: TorneoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarTorneo()
  }

  public cargarTorneo() {
    console.log("llega a cargar torneo")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log("llega a cargar torneo con el id ", id)
      if (id) {
        this.torneoService.buscarTorneoPorId(id).subscribe(
          (response) => this.torneo = response
        )
      }
    })
  }

  public crearTorneo(): void {
    this.torneoService.crearTorneo(this.torneo).subscribe(
      reponse => {
        this.router.navigate(['/listTorneo'])
        swal.fire('Nuevo torneo', `Torneo ${this.torneo.tornNombre} creado con éxito`, 'success')
      }
    )
  }

  public actualizarTorneo():void {
    this.torneoService.actualizarTorneo(this.torneo)
      .subscribe(
        respuesta => {
          this.router.navigate(['/listTorneo'])
          swal.fire('Torneo actualizado', `Torneo ${this.torneo.tornNombre} creado con éxito`, 'success')
        }
      )
  }

}
