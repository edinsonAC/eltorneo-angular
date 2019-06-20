import { Component, OnInit } from '@angular/core';
import { Partido } from '../partido';
import { PartidoService } from '../partido.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-partido',
  templateUrl: './list-partido.component.html',
  styleUrls: ['./list-partido.component.css']
})
export class ListPartidoComponent implements OnInit {
  idTorneo: string;
  dtOptions: DataTables.Settings = {};
  partidos: Partido[];
  dtTrigger: Subject<Partido> = new Subject();

  constructor(
    private partidoService: PartidoService,
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

    this.activateRoute.params.subscribe(params => {
      this.idTorneo = params['id']
      if (this.idTorneo) {
        this.partidoService.listarPartidos(this.idTorneo).
          subscribe(
            response => {
              this.partidos = response
              this.dtTrigger.next();
            });
      }
    }
    )
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
