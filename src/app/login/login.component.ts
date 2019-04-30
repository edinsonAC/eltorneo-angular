import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: '', password: '' };

  constructor(private app: AppserviceService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }

}
