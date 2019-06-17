import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    title: string = 'app el torneo'
    sesionActiva: boolean = false;
    private tipoUsuario: string;

    constructor(
        private router: Router,
        private authService: AuthService,
        private appC: AppComponent
    ) {
    }
    ngOnInit() {
    }

    public logout(): void {
        this.authService.logout();
    }

}