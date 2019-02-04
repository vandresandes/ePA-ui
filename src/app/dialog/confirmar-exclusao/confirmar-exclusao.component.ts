import { DynamicDialogRef } from 'primeng/components/dynamicdialog/dynamicdialog-ref';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-confirmar-exclusao',
  templateUrl: './confirmar-exclusao.component.html',
  styleUrls: ['./confirmar-exclusao.component.scss']
})
export class ConfirmarExclusaoComponent implements OnInit {

  lbBtnSim: string = "Sim";
  lbBtnNao: string = "Não";
  msgExcluirRegistro: string = AppConstants.MSG_EXCLUIR_REGISTRO;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {
  }

  sim() {
    this.ref.close(1);
  }

  nao() {
    this.ref.close(0);
  }

}
