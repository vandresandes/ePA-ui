import { AppUtil } from './../app-util';
import { TipoProcessoDto } from './../dto/tipo-processo-dto';
import { TipoProcesso } from './../model/tipoProcesso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginacaoDto } from '../dto/paginacao-dto';

@Injectable({
  providedIn: 'root'
})
export class TipoProcessoService {
  resource: string = "tipoprocesso";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
  }

  save(entity: TipoProcesso) {
    return this.httpClient.post(`${environment.apiUrl}/${this.resource}`, entity, { observe: 'response' }).pipe();
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.resource}/${id}`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  buscarTermoGeralPorIds(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/materia/${id}`).pipe(res=> res);
  }

  buscarPaginado(filtro: TipoProcessoDto, paginacao: PaginacaoDto) {
    let parametros = this.criarParamsBuscarPaginado(filtro, paginacao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`, httpOptions).pipe();
  }

  criarParamsBuscarPaginado(filtro: TipoProcessoDto, paginacao: PaginacaoDto): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(filtro.nome)) {
      params = params.append('nome', filtro.nome);
    }
    if (!AppUtil.isNull(paginacao.page)) {
      params = params.append('page', String(paginacao.page));
    }
    if (!AppUtil.isNull(paginacao.rows)) {
      params = params.append('size', String(paginacao.rows));
    }
    return params;
  }

  filtrar(idNucleo: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number, idOrigem: number) {
    let parametros = this.criarParamsFitrar(idNucleo, idTermoGeral, idTermoEspecifico, idDocumento, idMateria, idOrigem);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idNucleo: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number, idOrigem: number): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(idNucleo)) {
      params = params.append('idNucleo', String(idNucleo));
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
    if (!AppUtil.isNull(idMateria)) {
      params = params.append('idMateria', String(idMateria));
    }
    if (!AppUtil.isNull(idOrigem)) {
      params = params.append('idOrigem', String(idOrigem));
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
