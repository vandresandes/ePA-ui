import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  resource: string = "materia";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

  filtrar(idNucleo: number, idTipoProcesso: number, idTermoGeral: number, idTermoEspecifico: number, idDocumento: number) {
    let body = new HttpParams({
      fromObject : {
        'idNucleo': String(idNucleo),
        'idTipoProcesso': String(idTipoProcesso),
        'idTermoGeral': String(idTermoGeral),
        'idTermoEspecifico': String(idTermoEspecifico),
        'idDocumento': String(idDocumento)
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({}),
      params: body
    };

    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/filtrar`, httpOptions).pipe();
  }
}
