import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { SelectItem, Message, ConfirmationService } from 'primeng/components/common/api';
import { Checklist } from 'src/app/model/checklist';
import { SeiService } from 'src/app/service/sei.service';
import { AppUtil } from 'src/app/app-util';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
  providers: [ ConfirmationService ]
})
export class DocumentosComponent implements OnInit {

  checklistSelecionado: Checklist;
  numeroDocumentoSEI: string;
  listaChecklistComNumeroDocSei: Checklist[] = [];
  msgs: Message[] = [];

  lbItem: string = "Item";
  lbInformeONumeroDocumentoSei: string = "Informe o número do documento no SEI";
  lbSelecione: string = AppConstants.SELECIONE;
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  @Input() retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;
  @Input() listaChecklistTemplate: SelectItem[] = [];
  @Output() outputMsgs =  new EventEmitter();

  constructor(
    private seiService: SeiService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {}

  isValidAdicionarNumeroDocSei(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (AppUtil.isNull(this.checklistSelecionado)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbItem});
      valid = false;
    }
    if (AppUtil.isNull(this.numeroDocumentoSEI)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbInformeONumeroDocumentoSei});
      valid = false;
    }
    if (valid) {
      this.listaChecklistComNumeroDocSei.forEach(element => {
        if ((element.id === this.checklistSelecionado.id) && element.numeroDocumentoSEI === this.numeroDocumentoSEI)  {
          this.msgs.push({severity:'info', summary:"Atenção!", detail:"Item já adicionado com o mesmo número do documento no SEI"});
          valid = false;
        }
      });
    }

    if (valid) {
      this.isValidExisteDocumento();
    } else {
      this.enviarMsgs();
      return false;
    }
  }

  isValidExisteDocumento() {
    let valid: any;
    this.seiService.existeDocumento(this.retornoConsultaProcedimento.procedimentoFormatado, this.numeroDocumentoSEI).subscribe(
      data => {
        valid = data
      },
      error => console.log(error),
      () => {
        if (valid) {
          this.adicionarNumeroDocSei();
        } else {
          this.msgs.push({severity:'info', summary:"Atenção!", detail:"Número do documento no SEI não encontrado."});
        }
        this.enviarMsgs();
      }
    );
  }

  enviarMsgs() {
    this.outputMsgs.emit(this.msgs);
  }

  adicionarNumeroDocSei() {
    // adiciona a referência do número do documento no sei no objeto
    this.checklistSelecionado.numeroDocumentoSEI = this.numeroDocumentoSEI;
    // clona o objeto checklist
    this.checklistSelecionado = {...this.checklistSelecionado};
    // add na lista
    this.listaChecklistComNumeroDocSei.push(this.checklistSelecionado);
    // limpa os campos
    this.checklistSelecionado = null;
    this.numeroDocumentoSEI = null;
  }

  confirmarExclusaoChecklist(item: any) {
    this.confirmationService.confirm({
        message: AppConstants.MSG_EXCLUIR_REGISTRO,
        header: 'Exclusão',
        icon: 'pi pi-info-circle',
        acceptLabel: AppConstants.BTN_EXCLUIR_REGISTRO_SIM,
        rejectLabel: AppConstants.BTN_EXCLUIR_REGISTRO_NAO,
        accept: () => {
          this.excluirChecklistComNumeroDocSei(item);
          this.msgs = [{severity:'info', summary:'Confirmado', detail: AppConstants.MSG_REGISTRO_EXCLUIDO}];
        },
        reject: () => {}
    });
  }

  excluirChecklistComNumeroDocSei(item: any) {
    this.listaChecklistComNumeroDocSei.splice(this.listaChecklistComNumeroDocSei.indexOf(item), 1);
  }

}
