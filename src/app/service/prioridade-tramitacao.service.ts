import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrioridadeTramitacaoService {
  resource: string = "prioridadetramitacao";

  constructor(private httpClient: HttpClient) { }

  buscarPorValor(valor: String) {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}/${valor}`).pipe();
  }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/${this.resource}`).pipe();
  }

}
