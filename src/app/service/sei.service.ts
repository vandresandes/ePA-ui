import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUtil } from '../app-util';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeiService {

  resource: string = "sei";

  constructor(private httpClient: HttpClient) { }

  existeDocumento(protocoloProcedimento: string, protocoloDocumento: string) {
    let parametros = this.criarParams(protocoloProcedimento, protocoloDocumento);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/existeDocumento`, httpOptions).pipe(res=> res);
  }

  existeProtocolo(protocoloProcedimento: string) {
    let parametros = this.criarParams(protocoloProcedimento, null);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/existeProtocolo`, httpOptions).pipe(res=> res);
  }

  contarProcessoAbertoEmOutrasUnidades(protocoloProcedimento: string) {
    let parametros = this.criarParams(protocoloProcedimento, null);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/contarProcessoAbertoEmOutrasUnidades`, httpOptions).pipe(res=> res);
  }

  consultarProtocolo(protocoloProcedimento: string) {
    let parametros = this.criarParams(protocoloProcedimento, null);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/consultarProtocolo`, httpOptions).pipe(res=> res);
  }

  consultarDocumento(protocoloDocumento: string) {
    let parametros = this.criarParams(null, protocoloDocumento);

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: parametros
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/consultarDocumento`, httpOptions).pipe(res=> res);
  }

  criarParams(protocoloProcedimento: string, protocoloDocumento: string): HttpParams {
    var params = new HttpParams();
    if (!AppUtil.isNull(protocoloProcedimento)) {
      params = params.append('protocoloProcedimento', String(protocoloProcedimento));
    }
    if (!AppUtil.isNull(protocoloDocumento)) {
      params = params.append('protocoloDocumento', String(protocoloDocumento));
    }
    return params;
  }

}
