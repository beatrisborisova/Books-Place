import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {  Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.userService.getToken();

    if (token) {
      request = request.clone({
        url: `${request.url}?auth=${token}`
      });
    };

    return next.handle(request);
  }
}
