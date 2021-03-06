import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Documento } from '../model/documento';
import { DocumentoDto } from '../dto/documento-dto';
import { PaginacaoDto } from '../dto/paginacao-dto';
import { AppUtil } from '../app-util';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  resource: string = "documento";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
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

  buscarPaginado(filtro: DocumentoDto, paginacao: PaginacaoDto) {
    let parametros = this.criarParamsBuscarPaginado(filtro, paginacao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`, httpOptions).pipe();
  }

  criarParamsBuscarPaginado(filtro: DocumentoDto, paginacao: PaginacaoDto): HttpParams {
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

  filtrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idMateria: number) {
    let parametros = this.criarParamsFitrar(idNucleo, idTipoProcesso, idTermoGeral, idTermoEspecifico, idMateria);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idMateria: number): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(idNucleo)) {
      params = params.append('nucleo.id', String(idNucleo));
    }
    if (!AppUtil.isNull(idTipoProcesso)) {
      params = params.append('tipoProcesso.id', String(idTipoProcesso));
    }
    if (!AppUtil.isNull(idTermoGeral)) {
      params = params.append('termoGeral.id', String(idTermoGeral));
    }
    if (!AppUtil.isNull(idTermoEspecifico)) {
      params = params.append('termoEspecifico.id', String(idTermoEspecifico));
    }
    if (!AppUtil.isNull(idMateria)) {
      params = params.append('nucleo.materia.id', String(idMateria));
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
