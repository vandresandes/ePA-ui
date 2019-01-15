import { AuthenticationService } from './../service/authentication.service';
import { InteressadoDialogComponent } from './../dialog/interessado-dialog/interessado-dialog.component';
import { Proponente } from './../model/proponente';
import { Processo } from './../model/processo';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { ProponenteDialogComponent } from '../dialog/proponente-dialog/proponente-dialog.component';
import { Interessado } from '../model/interessado';
import { Message } from 'primeng/components/common/message';
import { TermoGeralService } from '../service/termo-geral.service';
import { TermoEspecificoService } from '../service/termo-especifico.service';

@Component({
  selector: 'app-ingresso-de-processos',
  templateUrl: './ingresso-de-processos.component.html',
  styleUrls: ['./ingresso-de-processos.component.scss'],
  entryComponents: [ProponenteDialogComponent, InteressadoDialogComponent],
  providers: [DialogService],
})
export class IngressoDeProcessosComponent implements OnInit {

  entity: Processo = new Processo();
  msgs: Message[] = [];

  listaMotivo: any;
  listaMateria: any;
  listaAssunto: any;
  listaSubAssunto: any;
  listaPrioridadeTramitacao: any;
  listaSigiloSegredoJustica: any;
  listaSolicitadaUrgencia: any;
  listaProponente: [Proponente];
  listaInteressado: [Proponente];
  listaTermoGeral: any;
  listaTermoEspecifico: any;

  lbSelecione: string = AppConstants.SELECIONE;
  lbMotivo: string = "Motivo";
  lbNProcessoNaOrigem: string = "Nº do processo origem (SEI)";
  lbProponente: string = "Proponente";
  lbInteressados: string = "Interessados";
  lbMateria: string = "Matéria";
  lbAssunto: string = "Assunto";
  lbSubAssunto: string = "Sub-assunto";
  lbObjeto: string = "Objeto";
  lbPrioridadeTramitacao: string = "Prioridade de Tramitação";
  lbSigiloOuSegredoDeJustica: string = "Sigilo ou segredo de justiça";
  lbSolicitadaUrgencia: string = "Solicitada urgência";
  lbObservacoes: string = "Observações";
  lbBtnSalvar: string = "Salvar";
  lbBtnEnviar: string = "Enviar";
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  constructor(
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    ) {
      this.buscarTodosTermoGeral();
      this.buscarTodosTermoEspecifico();
    }

  ngOnInit() {
    this.listaMotivo = [
      {nome: 'Novo processo'},
      {nome: 'Processo para ser apensado a outro existente'},
      {nome: 'Processo para ser anexado a outro existente'},
      {nome: 'Processo para servir de consulta a outro existente'}
    ];

    this.listaMateria = [
      {nome: 'Disciplinar e Sancionatório'},
      {nome: 'Licitações e contratos'},
      {nome: 'Parcerias (Convênios, Contratos de Gestão)'},
      {nome: 'Patrimônio Público e Meio Ambiente'},
      {nome: 'Pessoal'},
      {nome: 'Previdência'},
      {nome: 'Controle Externo'}
    ];

    this.listaPrioridadeTramitacao = [
      {nome: 'Sem prioridade'},
      {nome: 'Pessoa com idade superior a 60 anos'},
      {nome: 'Pessoa com necessidades especiais ou doença grave'}
    ];

    this.listaSigiloSegredoJustica = [
      {nome: 'Sem sigilo'},
      {nome: 'Sigiloso'},
      {nome: 'Segredo de Justiça'}
    ];

    this.entity.solicitadaUrgencia = '0';
  }

  showProponente() {
    const ref = this.dialogService.open(ProponenteDialogComponent, {
      header: 'Proponente',
      width: '70%',
      contentStyle: {"max-height": "350px", "overflow": "auto"}
    });

    ref.onClose.subscribe((proponente: Proponente) => {
      if (proponente) {
          // adicionar na lista
      }
    });
  }

  showInteressado() {
    const ref = this.dialogService.open(ProponenteDialogComponent, {
      header: 'Interessado',
      width: '70%',
      contentStyle: {"max-height": "350px", "overflow": "auto"}
    });

    ref.onClose.subscribe((proponente: Proponente) => {
      if (proponente) {
        // adicionar na lista
      }
    });
  }

  excluirProponente(item: Proponente) {
    this.listaProponente = null;
  }

  excluirInteressado(item: Proponente) {
    this.listaInteressado = null;
  }

  salvar() {
    if (this.isValidSalvar()) {
      // service
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (this.entity.motivo === null || this.entity.motivo === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbMotivo});
      valid = false;
    }
    if (this.entity.materia === null || this.entity.materia === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbMateria});
      valid = false;
    }
    if (this.entity.assunto === null || this.entity.assunto === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbAssunto});
      valid = false;
    }
    if (this.entity.subAssunto === null || this.entity.subAssunto === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSubAssunto});
      valid = false;
    }
    if (this.entity.prioridadeTramitacao === null || this.entity.prioridadeTramitacao === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbPrioridadeTramitacao});
      valid = false;
    }
    if (this.entity.sigiloSegredoJustica === null || this.entity.sigiloSegredoJustica === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSigiloOuSegredoDeJustica});
      valid = false;
    }
    if (this.entity.solicitadaUrgencia === null || this.entity.solicitadaUrgencia === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbSolicitadaUrgencia});
      valid = false;
    }
    return valid;
  }

  buscarTodosTermoGeral() {
    this.termoGeralService.findAll().subscribe(
			data => {
        this.listaTermoGeral = data,
        this.listaAssunto = data
			},
			error => console.log(error)
    );
  }

  buscarTodosTermoEspecifico() {
    this.termoEspecificoService.findAll().subscribe(
			data => {
        this.listaTermoEspecifico = data,
        this.listaSubAssunto = data
			},
			error => console.log(error)
    );
  }

  enviar() {

  }
}
