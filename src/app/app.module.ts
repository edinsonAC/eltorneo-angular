import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuarioService } from './componentes/usuario/usuario.service';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './login/authentication.service';
import { AuthGuard } from './../guard/auth.guard';
import { JwtInterceptor } from './../guard/jwt.interceptor';
import { AuthService } from './auth/services/auth.service';
import { TorneoComponent } from './componentes/torneo/torneo.component';
import { ListTorneoComponent } from './componentes/list-torneo/list-torneo.component';
import { TorneoService } from './componentes/torneo/torneo.service';
import { JugadorComponent } from './componentes/jugador/jugador.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';
import { ListEquipoComponent } from './componentes/equipo/list-equipo/list-equipo.component';
import { EquipoService } from './componentes/equipo/equipo.service';
import { ListJugadorComponent } from './componentes/jugador/list-jugador/list-jugador.component';
import { JugadorService } from './componentes/jugador/jugador.service';
import { PartidoComponent } from './componentes/partido/partido.component';
import { ListPartidoComponent } from './componentes/partido/list-partido/list-partido.component';
import { PartidoService } from './componentes/partido/partido.service';
import { DataTablesModule } from 'angular-datatables';
import { ArbitroComponent } from './componentes/arbitro/arbitro.component';
import { ArbitroService } from './componentes/arbitro/arbitro.service';

const routes: Routes = [
  { path: '', component: DirectivaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listTorneo', component: ListTorneoComponent },
  { path: 'torneo/:id', component: TorneoComponent },
  { path: 'torneo', component: TorneoComponent },
  { path: 'listEquipo', component: ListEquipoComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'equipo/:id', component: EquipoComponent },
  { path: 'torneo', component: EquipoComponent },
  { path: 'listJugadores/:id', component: ListJugadorComponent },
  { path: 'jugador', component: JugadorComponent },
  { path: 'jugador/:id', component: JugadorComponent },
  { path: 'listPartido', component: ListPartidoComponent },
  { path: 'partido/:id', component: PartidoComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    LoginComponent,
    UsuarioComponent,
    HomeComponent,
    TorneoComponent,
    ListTorneoComponent,
    JugadorComponent,
    EquipoComponent,
    ListEquipoComponent,
    ListJugadorComponent,
    PartidoComponent,
    ListPartidoComponent,
    ArbitroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [ClienteService,
    UsuarioService,
    AuthenticationService,
    AuthService,
    TorneoService,
    EquipoService,
    AppComponent,
    JugadorService,
    PartidoService,
    ArbitroService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
