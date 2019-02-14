import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          if (this.authenticationService.currentUserValue) {
            // logout automático se a resposta 401 for retornada da API
            this.authenticationService.logout();
            location.reload(true);
          }
        }

        const error = (err.error && err.error.message) || err.statusText;
        return throwError("Usuário ou senha inválida!");
      }))
    }
}
