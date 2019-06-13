import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppserviceService } from './appservice.service';
import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentUser: any;
  title = 'probando angular';
  curso: string = "Angular y spring";
  profesor: string = "Cracktolinez";

  constructor(private app: AppserviceService,
    private http: HttpClient,
    private router: Router
  ) {
  }
}
