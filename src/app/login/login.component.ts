import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../componentes/usuario/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../componentes/usuario/usuario.service';
import { AuthService } from '../auth/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  usuario: Usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService,
    private authenticationService: AuthService

  ) {  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.usuario.usuaUsuario = this.f.username.value;
    this.usuario.password = this.f.password.value;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.usuario);
  }

}
