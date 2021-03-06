import { AppUtil } from './../app-util';
import { ChecklistPesquisaDto } from './../dto/checklist-pesquisa-dto';
import { Checklist } from './../model/checklist';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginacaoDto } from '../dto/paginacao-dto';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  resource: string = "checklist";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/all`).pipe();
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

  buscarPaginado(filtro: ChecklistPesquisaDto, paginacao: PaginacaoDto) {
    let parametros = this.criarParamsBuscarPaginado(filtro, paginacao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`, httpOptions).pipe();
  }

  criarParamsBuscarPaginado(filtro: ChecklistPesquisaDto, paginacao: PaginacaoDto): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(filtro.nucleo)) {
      params = params.append('nucleo.nome', String(filtro.nucleo));
    }
    if (!AppUtil.isNull(filtro.tipoProcesso)) {
      params = params.append('tipoProcesso.nome', String(filtro.tipoProcesso));
    }
    if (!AppUtil.isNull(filtro.termoGeral)) {
      params = params.append('termoGeral.nome', String(filtro.termoGeral));
    }
    if (!AppUtil.isNull(filtro.termoEspecifico)) {
      params = params.append('termoEspecifico.nome', String(filtro.termoEspecifico));
    }
    if (!AppUtil.isNull(filtro.documento)) {
      params = params.append('documento.nome', String(filtro.documento));
    }
    if (!AppUtil.isNull(filtro.obrigatorio)) {
      params = params.append('obrigatorio', String(filtro.obrigatorio));
    }
    if (!AppUtil.isNull(paginacao.page)) {
      params = params.append('page', String(paginacao.page));
    }
    if (!AppUtil.isNull(paginacao.rows)) {
      params = params.append('size', String(paginacao.rows));
    }
    return params;
  }

  filtrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number, idOrigem: number) {
    let parametros = this.criarParamsFitrar(idNucleo, idTipoProcesso, idTermoGeral, idTermoEspecifico, idDocumento, idMateria, idOrigem);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }

  criarParamsFitrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number, idMateria: number, idOrigem: number): HttpParams {
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
    if (!AppUtil.isNull(idDocumento)) {
      params = params.append('documento.id', String(idDocumento));
    }
    if (!AppUtil.isNull(idMateria)) {
      params = params.append('nucleo.materia.id', String(idMateria));
    }
    if (!AppUtil.isNull(idOrigem)) {
      params = params.append('origem.id', String(idOrigem));
    }
    if (!AppUtil.isNull(idOrigem)) {
      params = params.append('nucleo.materia.origem.id', String(idOrigem));
    }
    return params;
  }

}
