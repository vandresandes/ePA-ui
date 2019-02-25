import { Component, OnInit, Input } from '@angular/core';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';
import { AppConstants } from 'src/app/app-constants';
import { AndamentoSEI } from 'src/app/model/sei/andamento-sei';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-informacoes-no-sei',
  templateUrl: './informacoes-no-sei.component.html',
  styleUrls: ['./informacoes-no-sei.component.scss']
})
export class InformacoesNoSeiComponent implements OnInit {

  protocoloProcedimento: string;
  listaDocumentos: any;
  lbNProcessoNaOrigem: string = "Nº do processo origem (SEI)";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;
  msgs: Message[] = [];

  @Input() retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;

  constructor() {}

  ngOnInit() {}


  getUnidadeGeracaoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.andamentoGeracao) {
      return `${this.retornoConsultaProcedimento.andamentoGeracao.unidade.sigla} | ${this.retornoConsultaProcedimento.andamentoGeracao.unidade.descricao}`;
    }
    return null;
  }

  getUnidadeUltimoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.ultimoAndamento) {
      return `${this.retornoConsultaProcedimento.ultimoAndamento.unidade.sigla} | ${this.retornoConsultaProcedimento.ultimoAndamento.unidade.descricao}`;
    }
    return null;
  }

  getUnidadeConclusaoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.andamentoConclusao) {
      return `${this.retornoConsultaProcedimento.andamentoConclusao.unidade.sigla} | ${this.retornoConsultaProcedimento.andamentoConclusao.unidade.descricao}`;
    }
    return null;
  }

  getUsuarioGeracaoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.andamentoGeracao) {
      return `${this.retornoConsultaProcedimento.andamentoGeracao.usuario.nome} | ${this.retornoConsultaProcedimento.andamentoGeracao.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioUltimoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.ultimoAndamento) {
      return `${this.retornoConsultaProcedimento.ultimoAndamento.usuario.nome} | ${this.retornoConsultaProcedimento.ultimoAndamento.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioConclusaoAndamento(): string {
    if (this.retornoConsultaProcedimento && this.retornoConsultaProcedimento.andamentoConclusao) {
      return `${this.retornoConsultaProcedimento.andamentoConclusao.usuario.nome} | ${this.retornoConsultaProcedimento.andamentoConclusao.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioAndamento(andamento: AndamentoSEI): string {
    return andamento ? `${andamento.usuario.nome} | ${andamento.usuario.sigla}` : null;
  }

}
