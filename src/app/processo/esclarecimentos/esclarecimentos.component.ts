import { Component, OnInit, Input } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-esclarecimentos',
  templateUrl: './esclarecimentos.component.html',
  styleUrls: ['./esclarecimentos.component.scss']
})
export class EsclarecimentosComponent implements OnInit {

  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;

  @Input() listaChecklist: any;

  constructor() { }

  ngOnInit() {
  }

  onClickRaddioButtonCondicao(item: any) {
    item['obrigatorio'] = item['condicaoAceita'] == 1;
  }

}
