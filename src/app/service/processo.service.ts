import { ProcessoDto } from './../dto/processo-dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PaginacaoDto } from '../dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  resource: string = "processo.json";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrlFake}/${this.resource}`).pipe();
  }

  buscarPaginado(filtro: ProcessoDto, paginacao: PaginacaoDto) {
    let parametros = this.criarParamsBuscarPaginado(filtro, paginacao);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/buscarpaginado`, httpOptions).pipe();
  }

  criarParamsBuscarPaginado(filtro: ProcessoDto, paginacao: PaginacaoDto): HttpParams {
    var params = new HttpParams();
    return params;
  }

}
