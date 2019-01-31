import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppUtil } from '../app-util';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {

  resource: string = "orgao";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  filtrar(nome: string, descricao: string) {
    let parametros = this.criarParamsFitrar(nome, descricao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(nome: string, descricao: string): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(nome)) {
      params = params.append('nome', String(nome));
    }
    if (!AppUtil.isNull(descricao)) {
      params = params.append('descricao', String(descricao));
    }
    return params;
  }
}
