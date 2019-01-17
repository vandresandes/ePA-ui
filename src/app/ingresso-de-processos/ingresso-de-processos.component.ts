import { TermoGeral } from './../model/termoGeral';
import { DocumentoService } from 'src/app/service/documento.service';
import { AppUtil } from './../app-util';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { MateriaService } from './../service/materia.service';
import { OrigemService } from './../service/origem.service';
import { AuthenticationService } from './../service/authentication.service';
import { InteressadoDialogComponent } from './../dialog/interessado-dialog/interessado-dialog.component';
import { Proponente } from './../model/proponente';
import { Processo } from './../model/processo';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { ProponenteDialogComponent } from '../dialog/proponente-dialog/proponente-dialog.component';
import { Message } from 'primeng/components/common/message';
import { TermoGeralService } from '../service/termo-geral.service';
import { TermoEspecificoService } from '../service/termo-especifico.service';
import { NucleoService } from '../service/nucleo.service';

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

  listaTipoProcesso: any;
  listaTermoGeral: any;
  listaTermoEspecifico: any;
  listaDocumento: any;

  listaNucleo: any;
  listaMotivo: any;
  listaMateria: any;
  listaPrioridadeTramitacao: any;
  listaSigiloSegredoJustica: any;
  listaSolicitadaUrgencia: any;
  listaOrigem: any;
  listaProponente: Proponente[] = [];
  listaInteressado: Proponente[] = [];

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
    private origemService: OrigemService,
    private materiaService: MateriaService,
    private nucleoService: NucleoService,
    private tipoProcessoService: TipoProcessoService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private documentoService: DocumentoService
    ) {
    this.buscarTodosOrigem();
    this.buscarTodosMateria();
  }

  ngOnInit() {
    this.listaMotivo = [
      {nome: 'Novo processo'},
      {nome: 'Processo para ser apensado a outro existente'},
      {nome: 'Processo para ser anexado a outro existente'},
      {nome: 'Processo para servir de consulta a outro existente'}
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
        this.listaProponente.push(proponente);
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
        this.listaInteressado.push(proponente);
        // adicionar na lista
      }
    });
  }

  excluirProponente(item: Proponente) {
    this.listaProponente.splice(this.listaProponente.indexOf(item), 1);
  }

  excluirInteressado(item: Proponente) {
    this.listaInteressado.splice(this.listaInteressado.indexOf(item), 1);
  }

  salvar() {
    if (this.isValidSalvar()) {
      // service
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (AppUtil.isNull(this.entity.motivo)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbMotivo});
      valid = false;
    }
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

  buscarTodosOrigem() {
    this.origemService.findAll().subscribe(
			data => {
        this.listaOrigem = data
			},
			error => console.log(error)
    );
  }

  buscarTodosMateria() {
    this.materiaService.findAll().subscribe(
			data => {
        this.listaMateria = data
			},
			error => console.log(error)
    );
  }

  onchangeDropMateria() {
    this.listaTipoProcesso = null;
    this.listaTermoGeral = null;
    this.listaTermoEspecifico = null;
    this.listaDocumento = null;

    if (!AppUtil.isNull(this.entity.materia)) {
      this.tipoProcessoService.filtrar(null, null, null, null, this.entity.materia.id).subscribe(
        data => {
          this.listaTipoProcesso = data
        },
        error => console.log(error)
      );
    }
  }

  onchangeDropTipoProcesso() {
    this.listaTermoGeral = null;
    this.listaTermoEspecifico = null;
    this.listaDocumento = null;

    if (!AppUtil.isNull(this.entity.materia)) {
      this.termoGeralService.filtrar(
        null,
        this.entity.tipoProcesso.id,
        null,
        null,
        this.entity.materia.id
      ).subscribe(data => {
        this.listaTermoGeral = data
      },
        error => console.log(error)
      );
    }
  }

  onchangeDropAssunto() {
    this.listaTermoEspecifico = null;
    this.listaDocumento = null;

    if (!AppUtil.isNull(this.entity.termoGeral)) {
      this.termoEspecificoService.filtrar(
        null,
        this.entity.tipoProcesso.id,
        this.entity.termoGeral.id,
        null,
        this.entity.materia.id
      ).subscribe(data => {
        this.listaTermoEspecifico = data,
        console.log(data)
      },
        error => console.log(error)
      );
    }
  }

  onchangeDropSubAssunto() {
    this.listaDocumento = null;

    if (!AppUtil.isNull(this.entity.termoEspecifico)) {
      this.documentoService.filtrar(
        null,
        this.entity.tipoProcesso.id,
        this.entity.termoGeral.id,
        this.entity.termoEspecifico.id,
        this.entity.materia.id
      ).subscribe(data => {
        this.listaDocumento = data
      },
        error => console.log(error)
      );
    }
  }

  enviar() {

  }
}
