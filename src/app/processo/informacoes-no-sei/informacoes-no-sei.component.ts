import { AppUtil } from './../../app-util';
import { SeiService } from './../../service/sei.service';
import { Component, OnInit } from '@angular/core';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';
import { AppConstants } from 'src/app/app-constants';

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



}
