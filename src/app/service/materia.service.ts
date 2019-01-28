import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppUtil } from '../app-util';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  resource: string = "materia";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  filtrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number) {
    let parametros = this.criarParamsFitrar(idNucleo, idTipoProcesso, idTermoGeral, idTermoEspecifico, idDocumento);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(idNucleo)) {
      params = params.append('idNucleo', String(idNucleo));
    }
    if (!AppUtil.isNull(idTipoProcesso)) {
      params = params.append('idTipoProcesso', String(idTipoProcesso));
    }
    if (!AppUtil.isNull(idTermoGeral)) {
      params = params.append('idTermoGeral', String(idTermoGeral));
    }
    if (!AppUtil.isNull(idTermoEspecifico)) {
      params = params.append('idTermoEspecifico', String(idTermoEspecifico));
    }
    if (!AppUtil.isNull(idDocumento)) {
      params = params.append('idDocumento', String(idDocumento));
    }
    return params;
  }

  filtrarNomes(nome: string) {
    let parametros = this.criarParamsFiltrarNomes(nome);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/nomes`, httpOptions).pipe();
  }

  criarParamsFiltrarNomes(nome: string): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(nome)) {
      params = params.append('nome', nome);
    }
    return params;
  }

}
