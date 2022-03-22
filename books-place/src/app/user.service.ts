import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: any;

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/register', user);
  };

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', user);
  };

}
