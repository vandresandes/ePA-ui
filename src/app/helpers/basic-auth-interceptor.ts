import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpBackend): Observable<HttpEvent<any>> {
    // adicionar cabeçalho de autorização com credenciais de autenticação básicas, se disponível
    console.log("BasicAuthInterceptor início");

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(currentUser);

    if (currentUser && currentUser.authdata) {
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${currentUser.token}`
        }
      });
    }

    console.log("BasicAuthInterceptor fim.");

    return next.handle(request);
  }

}
