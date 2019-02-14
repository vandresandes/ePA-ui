import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AccountCredentials } from '../model/account-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  resource: string = "usuario.json";
  resourceLogin: string = "login";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

loginFake(username: string, password: string) {
  return this.http.get<any>(`${environment.apiUrlFake}/${this.resource}`)
  .pipe(map(user => {
    if (username === user.username && password === user.password) {
      // login bem-sucedido se houver um token jwt na resposta
      if (user && user.token) {
        // armazenar detalhes do usuário e token jwt no armazenamento local para manter o usuário logado entre as atualizações da página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }
    throw 'Usuário ou Senha inválida!';
  }));
}

login(usuario: string, senha: string) {
  let accountCredentials: AccountCredentials = new AccountCredentials();
  accountCredentials.usuario = usuario;
  accountCredentials.senha = senha;
  return this.http.post<any>(`${environment.apiUrl}/${this.resourceLogin}`, accountCredentials, { observe: 'response' })
    .pipe(map(data => {
      let token: string = data.headers.get("Authorization");
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

logout() {
  // remover usuário do armazenamento local para fazer logout do usuário
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

}
