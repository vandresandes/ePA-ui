import { Checklist } from './../model/checklist';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  resource: string = "checklist";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

  save(entity: Checklist) {
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
}
