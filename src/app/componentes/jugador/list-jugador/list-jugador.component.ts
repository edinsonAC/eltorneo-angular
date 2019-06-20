import { Component, OnInit } from '@angular/core';
import { Jugador } from '../jugador';
import { JugadorService } from '../jugador.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-jugador',
  templateUrl: './list-jugador.component.html',
  styleUrls: ['./list-jugador.component.css']
})
export class ListJugadorComponent implements OnInit {
  jugadores: Jugador[];
  idEquipo:string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Jugador> = new Subject();

  constructor(
    private jugadorService: JugadorService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      "language": {
        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
    };


    this.listarJugadoresPorEquipo()
  }

  public listarJugadoresPorEquipo() {
    this.activateRoute.params.subscribe(params => {
      this.idEquipo = params['id']
      console.log("llega a cargar jugadores con el id ", this.idEquipo)
      if (this.idEquipo) {
        this.jugadorService.listarJugadoresPorEquipo(this.idEquipo).subscribe(
          (response) => {
            this.jugadores = response
            this.dtTrigger.next();
          }
        )
      }
    })
  }

}
