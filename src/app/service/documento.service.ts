import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Documento } from '../model/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  resource: string = "documento";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

  save(entity: Documento) {
    return this.httpClient.post(`${environment.apiUrl}/${this.resource}`, entity, { observe: 'response' }).pipe();
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.resource}/${id}`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  pesquisar(nome: string) {
    if (nome === null) {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/`).pipe(res=> res);
    } else {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/${nome}`).pipe(res=> res);
    }
  }

  pesquisarNomes(nome: string) {
    if (nome === null) {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes`).pipe(res=> res);
    } else {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes/${nome}`).pipe(res=> res);
    }
  }
}
