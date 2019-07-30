import { Component, OnInit } from '@angular/core';
import { User } from './usuario';
import { UsuarioService } from './usuario.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<User> = new Subject();

  usuarios: User[];

  constructor(private usuarioService: UsuarioService) {

  }
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


    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios
        this.dtTrigger.next();
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
