import { ChecklistPesquisaDto } from './../dto/checklist-pesquisa-dto';
import { Checklist } from './../model/checklist';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  buscar(filtro: ChecklistPesquisaDto) {
    let body = new HttpParams({
      fromObject : {
        'nucleo': filtro.nucleo,
        'tipoProcesso': filtro.tipoProcesso,
        'termoGeral': filtro.termoGeral,
        'termoEspecifico': filtro.termoEspecifico,
        'documento': filtro.documento,
        'status': String(filtro.status)
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: body
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar`, httpOptions).pipe();
  }
}
