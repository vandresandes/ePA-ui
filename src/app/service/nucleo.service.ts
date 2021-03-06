import { NucleoDto } from './../dto/nucleo-dto';
import { Nucleo } from './../model/nucleo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginacaoDto } from '../dto/paginacao-dto';
import { AppUtil } from '../app-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NucleoService {

  resource: string = "nucleo";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
  }

  save(entity: Nucleo) {
    return this.httpClient.post(`${environment.apiUrl}/${this.resource}`, entity, { observe: 'response' }).pipe();
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.resource}/${id}`).pipe();
  }

  findById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${id}`).pipe(res=> res);
  }

  buscarPaginado(filtro: NucleoDto, paginacao: PaginacaoDto) {
    let parametros = this.criarParamsBuscarPaginado(filtro, paginacao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get<any>(`${environment.apiUrl}/${this.resource}`, httpOptions).pipe();
  }

  criarParamsBuscarPaginado(filtro: NucleoDto, paginacao: PaginacaoDto): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(filtro.nome)) {
      params = params.append('nome', filtro.nome);
    }
    if (!AppUtil.isNull(filtro.nomeMateria)) {
      params = params.append('materia.nome', String(filtro.nomeMateria));
    }
    if (!AppUtil.isNull(paginacao.page)) {
      params = params.append('page', String(paginacao.page));
    }
    if (!AppUtil.isNull(paginacao.rows)) {
      params = params.append('size', String(paginacao.rows));
    }
    return params;
  }

  filtrar(idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number) {
    let parametros = this.criarParamsFitrar(idTipoProcesso, idTermoGeral, idTermoEspecifico, idDocumento, idMateria);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(idTipoProcesso)) {
      params = params.append('tipoProcesso.id', String(idTipoProcesso));
    }
    if (!AppUtil.isNull(idTermoGeral)) {
      params = params.append('termoGeral.id', String(idTermoGeral));
    }
    if (!AppUtil.isNull(idTermoEspecifico)) {
      params = params.append('termoEspecifico.id', String(idTermoEspecifico));
    }
    if (!AppUtil.isNull(idDocumento)) {
      params = params.append('documento.id', String(idDocumento));
    }
    if (!AppUtil.isNull(idMateria)) {
      params = params.append('materia.id', String(idMateria));
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
