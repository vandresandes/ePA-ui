import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  resource: string = "oauth/token";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private jwtHelperService: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

public get currentToken(): string {
  return this.currentUserValue ? this.currentUserValue.token : null;
}

getURL(): string {
  return `${environment.apiUrl}/${this.resource}`;
}

login(usuario: string, senha: string) {
  let formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("username", usuario);
  formData.append("password", senha);

  return this.http.post<any>(this.getURL(), formData,
  {
    headers: new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpzZW5oYVRlbXA='
    }),
    withCredentials: true,
    observe: 'response'

  }).pipe(map(data => {
      console.log("ok");

      let token: string = data['body']["access_token"];
      let user: User = data.body;

      if (user && token) {
        user.token = token;
        // armazenar detalhes do usuário e token jwt no armazenamento local para manter o usuário logado entre as atualizações da página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
  }));
}

refreshAccessToken(): Observable<string> {
  let formData = new FormData();
  formData.append("grant_type", "refresh_token");

  return this.http.post<any>(this.getURL(), formData,
  {
    headers: new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpzZW5oYVRlbXA='
    }),
    observe: 'response',
    withCredentials: true

  }).pipe(map(data => {
      console.log("refreshAccessToken service");

      let token: string = data['body']["access_token"];
      this.currentUserValue.token = token;
      return token;
  }));
}

isAccessTokenInvalido(): boolean {
  let token = this.currentToken;
  return !token || this.jwtHelperService.isTokenExpired(token);
}

logout() {
  // remover usuário do armazenamento local para fazer logout do usuário
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

}
