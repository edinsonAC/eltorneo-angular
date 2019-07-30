import { Component, OnInit } from '@angular/core';
import { ArbitroService } from './arbitro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Arbitro } from './arbitro';
import swal from 'sweetalert2'
import { User } from '../usuario/usuario';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent implements OnInit {
  usuarioArbitro: User = new User()
  arbitro: Arbitro = new Arbitro();

  constructor(
    private arbitroService: ArbitroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarArbitro()
  }

  public cargarArbitro() {
    console.log("llega a cargar arbitro")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log("llega a cargar JUGADOR con el id ", id)
      if (id) {
        this.arbitroService.buscarArbitroPorId(id).subscribe(
          (response) => {
            this.arbitro = response
            this.usuarioArbitro = this.arbitro.usuario
            console.log("el arbitro<>>>>>> ", this.arbitro)
          }
        )
      }
    })
  }

  public crearArbitro(): void {
    this.arbitro.usuario = this.usuarioArbitro
    console.log("------->>", this.arbitro)
    this.arbitroService.crearArbitro(this.arbitro).subscribe(
      (response) => {
        this.arbitro = response;
        this.router.navigate(['/listArbitro'])
        swal.fire('Nuevo arbitro', `Arbitro ${this.arbitro.arbiNombre} se registró con éxito`, 'success')
      }
    )
  }

  public actualizarArbitro(): void {
    this.arbitroService.actualizarArbitro(this.arbitro)
      .subscribe(
        respuesta => {
          this.router.navigate(['/listArbitro'])
          swal.fire('Arbitro actualizado', `Arbitro ${this.arbitro.arbiNombre} actualizado con éxito`, 'success')
        }
      )
  }


}
