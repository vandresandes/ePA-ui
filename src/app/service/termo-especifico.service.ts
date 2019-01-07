import { TermoEspecificoDto } from './../dto/termo-especifico-dto';
import { TermoEspecifico } from './../model/termoEspecifico';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermoEspecificoService {
  resource: string = "termoespecifico";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

  save(entity: TermoEspecifico) {
    return this.httpClient.post(`${environment.apiUrl}/${this.resource}`, entity, { observe: 'response' }).pipe();
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.resource}/${id}`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  buscar(filtro: TermoEspecificoDto) {
    let body = new HttpParams({
      fromObject : {
        'nome': filtro.nome
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: body
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar`, httpOptions).pipe();
  }

  pesquisarNomes(nome: string) {
    if (nome === null) {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes`).pipe(res=> res);
    } else {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes/${nome}`).pipe(res=> res);
    }
  }
}
