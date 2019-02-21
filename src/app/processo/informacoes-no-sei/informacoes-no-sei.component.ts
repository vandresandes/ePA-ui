import { UnidadeSEI } from './../../model/sei/unidade-sei';
import { AppUtil } from './../../app-util';
import { SeiService } from './../../service/sei.service';
import { Component, OnInit } from '@angular/core';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';
import { AppConstants } from 'src/app/app-constants';
import { AndamentoSEI } from 'src/app/model/sei/andamento-sei';

@Component({
  selector: 'app-informacoes-no-sei',
  templateUrl: './informacoes-no-sei.component.html',
  styleUrls: ['./informacoes-no-sei.component.scss']
})
export class InformacoesNoSeiComponent implements OnInit {

  retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;
  lbNProcessoNaOrigem: string = "Nº do processo origem (SEI)";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;

  constructor(private seiService: SeiService) {
    this.consultarProtocolo();
  }

  ngOnInit() {
  }

  consultarProtocolo() {
    let retorno: any;
    this.seiService.consultarProtocolo("123400000002017000003118").subscribe(
      data => {
        retorno = data,
        this.retornoConsultaProcedimento = retorno
      },
      error => console.log(error)
    );
  }

  getUnidadeGeracaoAndamento(): string {
    if (this.retornoConsultaProcedimento.andamentoGeracao) {
      return `${this.retornoConsultaProcedimento.andamentoGeracao.unidade.sigla} | ${this.retornoConsultaProcedimento.andamentoGeracao.unidade.descricao}`;
    }
    return null;
  }

  getUnidadeUltimoAndamento(): string {
    if (this.retornoConsultaProcedimento.ultimoAndamento) {
      return `${this.retornoConsultaProcedimento.ultimoAndamento.unidade.sigla} | ${this.retornoConsultaProcedimento.ultimoAndamento.unidade.descricao}`;
    }
    return null;
  }

  getUnidadeConclusaoAndamento(): string {
    if (this.retornoConsultaProcedimento.andamentoConclusao) {
      return `${this.retornoConsultaProcedimento.andamentoConclusao.unidade.sigla} | ${this.retornoConsultaProcedimento.andamentoConclusao.unidade.descricao}`;
    }
    return null;
  }

  getUsuarioGeracaoAndamento(): string {
    if (this.retornoConsultaProcedimento.andamentoGeracao) {
      return `${this.retornoConsultaProcedimento.andamentoGeracao.usuario.nome} | ${this.retornoConsultaProcedimento.andamentoGeracao.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioUltimoAndamento(): string {
    if (this.retornoConsultaProcedimento.ultimoAndamento) {
      return `${this.retornoConsultaProcedimento.ultimoAndamento.usuario.nome} | ${this.retornoConsultaProcedimento.ultimoAndamento.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioConclusaoAndamento(): string {
    if (this.retornoConsultaProcedimento.andamentoConclusao) {
      return `${this.retornoConsultaProcedimento.andamentoConclusao.usuario.nome} | ${this.retornoConsultaProcedimento.andamentoConclusao.usuario.sigla}`;
    }
    return null;
  }

  getUsuarioAndamento(andamento: AndamentoSEI): string {
    console.log(andamento);

    if (andamento) {
      return `${andamento.usuario.nome} | ${andamento.usuario.sigla}`;
    }
    return null;
  }


}
