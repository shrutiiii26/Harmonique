import { Injectable, inject } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { environment } from './environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  http = inject(HttpClient);

  login(data: any): Observable<any> {
    const url = environment.login;
    return this.http.post<any>(url, data);
  }
}
