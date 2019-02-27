import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Checklist } from './../../model/checklist';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { Message } from 'primeng/components/common/message';
import { ActivatedRoute, Params } from '@angular/router';
import { InteressadoDialogComponent } from 'src/app/dialog/interessado-dialog/interessado-dialog.component';
import { Processo, Interessado } from 'src/app/model';
import { AppConstants } from 'src/app/app-constants';
import { AppUtil } from 'src/app/app-util';
import { SeiService } from 'src/app/service/sei.service';
import { SelectItem } from 'primeng/components/common/api';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';

@Component({
  selector: 'app-ingresso-de-processos',
  templateUrl: './ingresso-de-processos.component.html',
  styleUrls: ['./ingresso-de-processos.component.scss'],
  entryComponents: [InteressadoDialogComponent],
  providers: [DialogService, ConfirmationService]
})
export class IngressoDeProcessosComponent implements OnInit {

  entity: Processo = new Processo();
  retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;
  orgaoSelecionado: any;
  isValidAbaEsclarecimento: boolean = false;

  listaChecklist: any;
  uploadedFiles: any[] = [];
  msgs: Message[] = [];
  listaOrgaoTemplate: SelectItem[] = [];
  listaChecklistTemplate: SelectItem[] = [];
  listaChecklistComNumeroDocSei: Checklist[] = [];

  lbMateria: string = "Matéria";
  lbAssunto: string = "Assunto";
  lbSubAssunto: string = "Sub-assunto";
  lbPrioridadeTramitacao: string = "Prioridade de Tramitação";
  lbSigiloOuSegredoDeJustica: string = "Sigilo ou segredo de justiça";
  lbSolicitadaUrgencia: string = "Solicitada urgência";
  lbObservacoes: string = "Observações";
  lbBtnSalvar: string = AppConstants.BTN_SALVAR;
  lbBtnEnviar: string = "Enviar";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;
  lbSelecione: string = AppConstants.SELECIONE;

  constructor(
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private seiService: SeiService
    ) {
    this.carregarParams();
  }

  ngOnInit() {
    this.entity.solicitadaUrgencia = false;
  }

  carregarParams() {
    this.route.params.forEach((params: Params) => {
      let protocoloProcedimento = this.route.params['value']['protocoloProcedimento'];
      this.entity.numeroProcesso = protocoloProcedimento;
      this.consultarProtocolo(protocoloProcedimento);
    });
  }

  consultarProtocolo(protocoloProcedimento: string) {
    let retorno: any;
    this.seiService.consultarProtocolo(protocoloProcedimento).subscribe(
      data => {
        retorno = data,
        this.retornoConsultaProcedimento = retorno,
        this.verificarUnidadesAbertas()
      },
      error => console.log(error)
    );
  }

  verificarUnidadesAbertas() {
    let numeroProcessos = this.retornoConsultaProcedimento.unidadesProcedimentoAberto ? this.retornoConsultaProcedimento.unidadesProcedimentoAberto.length : 0;
    if (numeroProcessos > 1) {
      this.msgs.push({severity:'info', summary:"Atenção!", detail:`Esse processo está aberto em ${numeroProcessos} unidades. Para o ingresso na PGE é necessário que ele seja fechado nas demais unidades.`});
    }
  }

  obterStatus(element: any): string {
    return element['obrigatorio'] ? 'Obrigatório' : 'Complementar';
  }

  popularListaChecklist(event: any) {
    this.listaChecklist = event;
    this.listaChecklistComNumeroDocSei = [];
    this.isValidAbaEsclarecimento = false;
  }

  popularListaChecklistTemplate(event: any) {
    this.listaChecklistTemplate = event;
  }

  popularMsgs(event: any) {
    this.msgs = event;
  }

  desabilitarAbaEsclarecimentos(): boolean {
    return AppUtil.isNull(this.listaChecklist);
  }

  desabilitarAbaDocumentos(): boolean {
    return AppUtil.isNull(this.listaChecklist) || (this.contemCondicaoNalistaChecklist() && !this.isValidAbaEsclarecimento);
  }

  setValidAbaEsclarecimento(event: boolean) {
    this.isValidAbaEsclarecimento = event;
    this.listaChecklistComNumeroDocSei = [];
  }

  contemCondicaoNalistaChecklist(): boolean {
    let contem: boolean = false;
    if (this.listaChecklist) {
      this.listaChecklist.forEach(element => {
        if (element['condicao']) {
          contem = true;
        }
      });
    }
    return contem;
  }

  salvar() {
    if (this.isValidSalvar()) {
      // service
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    return valid;
  }

  enviar() {
    if (this.isValidSalvar()) {
      // service
    }
  }

  isValidEnviar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (AppUtil.isNull(this.entity.materia)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbMateria});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.termoGeral)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbAssunto});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.termoEspecifico)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSubAssunto});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.prioridadeTramitacao)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbPrioridadeTramitacao});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.sigiloSegredoJustica)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSigiloOuSegredoDeJustica});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.solicitadaUrgencia)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSolicitadaUrgencia});
      valid = false;
    }
    return valid;
  }

}
