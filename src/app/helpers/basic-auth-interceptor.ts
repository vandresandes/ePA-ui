import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpBackend): Observable<HttpEvent<any>> {
    // adicionar cabeçalho de autorização com credenciais de autenticação básicas, se disponível
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.authdata) {
      request = request.clone({
        setHeaders: {
          Authorization:`Basic ${currentUser.authdata}`
        }
      });
    }
    return next.handle(request);
  }

}
