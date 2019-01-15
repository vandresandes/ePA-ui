import { Processo } from './../model/processo';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';

@Component({
  selector: 'app-ingresso-de-processos',
  templateUrl: './ingresso-de-processos.component.html',
  styleUrls: ['./ingresso-de-processos.component.scss']
})
export class IngressoDeProcessosComponent implements OnInit {

  entity: Processo = new Processo();
  listaMotivo: any;
  listaMateria: any;
  listaAssunto: any;
  listaSubAssunto: any;
  listaPrioridadeTramitacao: any;
  listaSigiloSegredoJustica: any;
  listaSolicitadaUrgencia: any;
  listaProponente: any;

  lbSelecione: string = AppConstants.SELECIONE;
  lbMotivo: string = "Motivo";
  lbNProcessoNaOrigem: string = "Nº do processo na origem";
  lbProponente: string = "Proponente";
  lbInteressados: string = "Interessados";
  lbMateria: string = "Matéria";
  lbAssunto: string = "Assunto";
  lbSubAssunto: string = "Sub-assunto";
  lbObjeto: string = "Objeto";
  lbPrioridadeTramitacao: string = "Prioridade de Tramitação";
  lbSigiloOuSegredoDeJustica: string = "Sigilo ou segredo de justiça";
  lbSolicitadaUrgencia: string = "Solicitada urgência";
  lbObservacoes: string = "Observações";
  lbBtnSalvar: string = "Salvar";
  lbBtnEnviar: string = "Enviar";
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;

  constructor() { }

  ngOnInit() {
  }

  salvar() {

  }

  enviar() {

  }

  addProponente() {

  }

  excluirProponente() {

  }

  addInteressado() {

  }

  excluirInteressado() {

  }
}
