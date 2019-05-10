import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppserviceService } from './appservice.service';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'probando angular';
  curso: string = "Angular y spring";
  profesor: string = "Cracktolinez";


}
