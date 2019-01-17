import { Message } from 'primeng/components/common/message';
import { Proponente } from './../../model/proponente';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { DynamicDialogRef } from 'primeng/components/dynamicdialog/dynamicdialog-ref';
import { AppUtil } from 'src/app/app-util';

@Component({
  selector: 'app-proponente-dialog',
  templateUrl: './proponente-dialog.component.html',
  styleUrls: ['./proponente-dialog.component.scss']
})
export class ProponenteDialogComponent implements OnInit {

  entity: Proponente = new Proponente();
  listaOrgao: any;
  msgs: Message[] = [];

  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  lbSelecione: string = AppConstants.SELECIONE;
  lbOrgao: string = "Órgão";
  lbNome: string = "Nome";
  lbEmail: string = "E-mail";
  lbTelefone: string = "Telefone";
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit() {
  }

  salvar() {
    if (this.isValidSalvar()) {
      this.ref.close(this.entity);
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    /*
    if (AppUtil.isNull(this.entity.orgao)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbOrgao});
      valid = false;
    }
    */
    if (AppUtil.isNull(this.entity.nome)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbNome});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.email)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbEmail});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.telefone)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTelefone});
      valid = false;
    }
    return valid;
  }

  cancelar() {
    this.ref.close();
  }

}
