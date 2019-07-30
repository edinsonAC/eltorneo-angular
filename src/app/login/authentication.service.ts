import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../componentes/usuario/usuario';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  prueba: User;
  private urlLogin: string = 'http://localhost:8080/api/loguear';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(us: User) {
    this.prueba = us;

    return this.http.post<any>(this.urlLogin, this.prueba)
      .pipe(map(user => {
       //  store user details and jwt token in local storage to keep user logged in between page refreshes

       localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    
  }
}