import { Component, OnInit } from '@angular/core';
import { Partido } from '../partido';
import { PartidoService } from '../partido.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ArbitroService } from '../../arbitro/arbitro.service';

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
    private arbitroService: ArbitroService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
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


    if (this.authService.getTipo() == '1') {
      this.listarPartidosPorTorneo()
    } else if (this.authService.getTipo() == '3') {
      this.listarPartidosAsignados()
    }


  }



  listarPartidosAsignados(): void {
    this.arbitroService.listarPartidosAsignados().
      subscribe(
        response => {
          this.partidos = response
          this.dtTrigger.next();
        });
  }

  listarPartidosPorTorneo(): void {
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
