import { Component, OnInit } from '@angular/core';
import { Torneo } from '../torneo/torneo';
import { TorneoService } from '../torneo/torneo.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-torneo',
  templateUrl: './list-torneo.component.html',
  styleUrls: ['./list-torneo.component.css']
})
export class ListTorneoComponent implements OnInit {
  torneos: Torneo[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Torneo> = new Subject();

  constructor(private torneoService: TorneoService) { }

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


    this.torneoService.listarTorneos().subscribe(
      (response) => {
        this.torneos = response
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
