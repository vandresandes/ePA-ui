import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  resource: string = "oauth/token";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

private getURL(): string {
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

obterNovoAccessToken(): Observable<User> {
  let formData = new FormData();
  formData.append("grant_type", "refresh_token");

  return this.http.post<any>(this.getURL(), formData,
  {
    headers: new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpzZW5oYVRlbXA='
    }),
    withCredentials: true,
    observe: 'response'

  }).pipe(map(data => {
      let token: string = data['body']["access_token"];
      let user: User = data.body;

      console.log("Novo access token criado.");

      if (user && token) {
        user.token = token;
        // armazenar detalhes do usuário e token jwt no armazenamento local para manter o usuário logado entre as atualizações da página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
  }));
}

logout() {
  // remover usuário do armazenamento local para fazer logout do usuário
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

}
