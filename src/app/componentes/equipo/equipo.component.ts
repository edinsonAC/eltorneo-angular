import { Component, OnInit } from '@angular/core';
import { EquipoService } from './equipo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from './equipo';
import swal from 'sweetalert2'

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  private equipo: Equipo = new Equipo();

  constructor(
    private equipoService: EquipoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarEquipo()
  }


  public cargarEquipo() {
    console.log("llega a cargar equipo")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log("llega a cargar equipo con el id ", id)
      if (id) {
        this.equipoService.buscarEquipoPorId(id).subscribe(
          (response) => this.equipo = response
        )
      }
    })
  }

  public crearEquipo(): void {
    this.equipoService.crearEquipo(this.equipo).subscribe(
      reponse => {
        this.router.navigate(['/listEquipo'])
        swal.fire('Nuevo equipo', `Equipo ${this.equipo.equiNombre} actualizado con éxito`, 'success')
      }
    )
  }

  public actualizarEquipo(): void {
    this.equipoService.actualizarEquipo(this.equipo)
      .subscribe(
        respuesta => {
          this.router.navigate(['/listEquipo'])
          swal.fire('Equipo actualizado', `Equipo ${this.equipo.equiNombre} actualizado con éxito`, 'success')
        }
      )
  }
}
