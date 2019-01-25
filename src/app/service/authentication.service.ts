import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  resource: string = "usuario.json";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

login(username: string, password: string) {
  return this.http.get<any>(`${environment.apiUrlFake}/${this.resource}`)
  .pipe(map(user => {
    console.log(user);


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

logout() {
  // remover usuário do armazenamento local para fazer logout do usuário
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}
}
