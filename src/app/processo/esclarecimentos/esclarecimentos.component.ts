import { Documento } from './../../model/documento';
import { AppUtil } from './../../app-util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-esclarecimentos',
  templateUrl: './esclarecimentos.component.html',
  styleUrls: ['./esclarecimentos.component.scss']
})
export class EsclarecimentosComponent implements OnInit {

  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;

  @Input() listaChecklist: any;
  @Output() outputIsValid = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickRaddioButtonCondicao(item: any) {
    item['obrigatorio'] = item['condicaoAceita'] == 1;
    item['esclarecimento'] = null;
    this.outputIsValid.emit(this.isValid());
  }

  onChangeTextareaEsclarecimento(item: any) {
    this.outputIsValid.emit(this.isValid());
  }

  isValid() {
    let valid: boolean = true;
    this.listaChecklist.forEach(element => {
      let condicao = element['condicao'];
      let condicaoAceita = element['condicaoAceita'];
      let esclarecimento = element['esclarecimento'];

      if (condicao) {
        if (AppUtil.isNull(condicaoAceita)) {
          valid = false;
          // adicionar mensagem de erro quando o raddioButton estiver nulo
        } else if (condicaoAceita == 0 && AppUtil.isNull(esclarecimento)) {
          valid = false;
          // adicionar mensagem de erro quando for selecionado 'Não' no raddioButton e o textArea 'Esclarecimento' estiver nulo
        }
      }
    });
    return valid;
  }

}
