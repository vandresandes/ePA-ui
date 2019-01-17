import { TermoGeralDto } from './../dto/termo-geral-dto';
import { TermoGeral } from './../model/termoGeral';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginacaoDto } from '../dto/paginacao-dto';
import { AppUtil } from '../app-util';

@Injectable({
  providedIn: 'root'
})
export class TermoGeralService {
  resource: string = "termogeral";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

  save(entity: TermoGeral) {
    return this.httpClient.post(`${environment.apiUrl}/${this.resource}`, entity, { observe: 'response' }).pipe();
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.resource}/${id}`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  buscar(filtro: TermoGeralDto) {
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

  buscarPaginado(filtro: TermoGeralDto, paginacao: PaginacaoDto) {
    let body = new HttpParams({
      fromObject : {
        'nome': filtro.nome,
        'page': String( paginacao.page ),
        'size': String( paginacao.rows )
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: body
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscarpaginado`, httpOptions).pipe();
  }

  filtrar(idNucleo: number, idTipoProcesso: number, idTermoEspecifico: number, idDocumento: number, idMateria: number) {
    let parametros = this.criarParamsFitrar(idNucleo, idTipoProcesso, idTermoEspecifico, idDocumento, idMateria);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idNucleo: number, idTipoProcesso: number, idTermoEspecifico: number, idDocumento: number, idMateria: number): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(idNucleo)) {
      params = params.append('idNucleo', String(idNucleo));
    }
    if (!AppUtil.isNull(idTipoProcesso)) {
      params = params.append('idTipoProcesso', String(idTipoProcesso));
    }
    if (!AppUtil.isNull(idTermoEspecifico)) {
      params = params.append('idTermoEspecifico', String(idTermoEspecifico));
    }
    if (!AppUtil.isNull(idDocumento)) {
      params = params.append('idDocumento', String(idDocumento));
    }
    if (!AppUtil.isNull(idMateria)) {
      params = params.append('idMateria', String(idMateria));
    }
    return params;
  }

  pesquisarNomes(nome: string) {
    if (nome === null) {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes`).pipe(res=> res);
    } else {
      return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscar/nomes/${nome}`).pipe(res=> res);
    }
  }
}
