import { Component, OnInit } from '@angular/core';
import { Torneo } from '../torneo/torneo';
import { TorneoService } from '../torneo/torneo.service';

@Component({
  selector: 'app-list-torneo',
  templateUrl: './list-torneo.component.html',
  styleUrls: ['./list-torneo.component.css']
})
export class ListTorneoComponent implements OnInit {
  torneos: Torneo[];

  constructor(private torneoService: TorneoService) { }

  ngOnInit() {
    this.torneoService.listarTorneos().subscribe(
      (response) => this.torneos = response
    );
  }

}
