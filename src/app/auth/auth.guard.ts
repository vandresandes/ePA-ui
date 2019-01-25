import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // autorizado, então retorne true
          return true;
      }

      // não está logado, então redirecione para a página de login com o URL de retorno (se houver)
      if (state.url === '/') {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
      return false;
  }
}
