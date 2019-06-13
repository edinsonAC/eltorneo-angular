import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    title: string = 'app el torneo'
    sesionActiva: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    public logout():void {
        this.authService.logout();
      }

}