import { Component, OnInit } from '@angular/core';
import { ArbitroService } from './arbitro.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent implements OnInit {

  constructor(
    private arbitroService: ArbitroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }



}
