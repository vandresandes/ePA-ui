import { AppUtil } from './../../app-util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoService } from 'src/app/service/processo.service';

@Component({
  selector: 'app-lista-de-processos',
  templateUrl: './lista-de-processos.component.html',
  styleUrls: ['./lista-de-processos.component.scss']
})
export class ListaDeProcessosComponent implements OnInit {

  lista: any;
  itemSelecionado: any;

  constructor(
    private router: Router,
    private service: ProcessoService
  ) {
    this.pesquisar();
  }

  ngOnInit() {
  }

  pesquisar() {
    this.service.findAll().subscribe(
      data => {
        this.lista = data
			},
			error => console.log(error)
    );
  }

  continuar() {
    if (AppUtil.isNull(this.itemSelecionado)) {
      return;
    }

    const link = ['/ingressoprocesso', this.itemSelecionado.id];
    this.router.navigate(link);
  }

}
