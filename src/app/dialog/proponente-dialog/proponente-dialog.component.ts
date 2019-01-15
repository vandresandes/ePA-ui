import { Proponente } from './../../model/proponente';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { DynamicDialogRef } from 'primeng/components/dynamicdialog/dynamicdialog-ref';

@Component({
  selector: 'app-proponente-dialog',
  templateUrl: './proponente-dialog.component.html',
  styleUrls: ['./proponente-dialog.component.scss']
})
export class ProponenteDialogComponent implements OnInit {

  entity: Proponente = new Proponente();
  listaOrgao: any;

  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  lbSelecione: string = AppConstants.SELECIONE;
  lbOrgao: string = "Órgão";
  lbNome: string = "Nome";
  lbEmail: string = "E-mail";
  lbTelefone: string = "Telefone";

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit() {
  }

  salvar() {
    this.ref.close(this.entity);
  }

  cancelar() {
    this.ref.close();
  }

}
