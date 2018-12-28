import { Nucleo } from './../model/nucleo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NucleoService {
  url: string = "http://localhost:8080/nucleo";

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get(this.url).pipe(res=> res);
  }

  save(entity: Nucleo) {
    // post
  }

  deleteById(id: number) {
    return this.httpClient.delete(`${this.url}/id`).pipe(res=> res);
  }

  findById(id: number) {
    return this.httpClient.get(`${this.url}/id`).pipe(res=> res);
  }
}
