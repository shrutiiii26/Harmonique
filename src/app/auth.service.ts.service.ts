import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(value: any) {
    throw new Error('Method not implemented.');
  }
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(private router: Router) {
    // this.token = localStorage.getItem('token');
    if (this.token) {
      this.loggedIn.next(true);
    }
  }

  storeToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.token = token;
      this.loggedIn.next(true);
    }
  }
  

  getToken() {
    return this.token;
  }

  logout() {
    // localStorage.removeItem('token');
    this.token = null;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
