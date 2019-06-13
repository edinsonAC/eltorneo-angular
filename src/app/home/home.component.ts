import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Demo';
  greeting = {};

  constructor(private http: HttpClient) {
    http.get('resource').subscribe(data => this.greeting = data);
  }
}
