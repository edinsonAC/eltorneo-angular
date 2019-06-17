import { Component, OnInit } from '@angular/core';
import { Equipo } from '../equipo';
import { EquipoService } from '../equipo.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-equipo',
  templateUrl: './list-equipo.component.html',
  styleUrls: ['./list-equipo.component.css']
})
export class ListEquipoComponent implements OnInit {

  equipos: Equipo[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Equipo> = new Subject();


  constructor(
    private equipoService: EquipoService
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

    this.equipoService.listarEquipos().subscribe(
      (response) => {
        this.equipos = response
        this.dtTrigger.next();
      }
    );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
