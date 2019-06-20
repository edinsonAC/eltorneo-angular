import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../arbitro';
import { ArbitroService } from '../arbitro.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-arbitro',
  templateUrl: './list-arbitro.component.html',
  styleUrls: ['./list-arbitro.component.css']
})
export class ListArbitroComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Arbitro> = new Subject();
  arbitros: Arbitro[];
  constructor(
    private arbitroService: ArbitroService,
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

    this.listarArbitros()

  }

  public listarArbitros() {
    this.arbitroService.listarArbitros().subscribe(
      (response) => {
        this.arbitros = response
        this.dtTrigger.next();
      }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
