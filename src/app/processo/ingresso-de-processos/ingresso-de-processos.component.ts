import { DocumentoService } from 'src/app/service/documento.service';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { Message } from 'primeng/components/common/message';
import { ActivatedRoute, Params } from '@angular/router';
import { InteressadoDialogComponent } from 'src/app/dialog/interessado-dialog/interessado-dialog.component';
import { Processo, Interessado } from 'src/app/model';
import { AppConstants } from 'src/app/app-constants';
import { ProcessoService } from 'src/app/service/processo.service';
import { OrigemService } from 'src/app/service/origem.service';
import { MateriaService } from 'src/app/service/materia.service';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { MotivoSigiloSegredoJusticaService } from 'src/app/service/motivo-sigilo-segredo-justica.service';
import { PrioridadeTramitacaoService } from 'src/app/service/prioridade-tramitacao.service';
import { SigiloSegredoJusticaService } from 'src/app/service/sigilo-segredo-justica.service';
import { ChecklistService } from 'src/app/service/checklist.service';
import { EnumPrioridadeTramitacao, EnumSigiloSegredoJustica } from 'src/app/enums';
import { AppUtil } from 'src/app/app-util';

@Component({
  selector: 'app-ingresso-de-processos',
  templateUrl: './ingresso-de-processos.component.html',
  styleUrls: ['./ingresso-de-processos.component.scss'],
  entryComponents: [InteressadoDialogComponent],
  providers: [DialogService],
})
export class IngressoDeProcessosComponent implements OnInit {

  entity: Processo = new Processo();
  msgs: Message[] = [];

  listaTipoProcesso: any;
  listaTermoGeral: any;
  listaTermoEspecifico: any;
  listaDocumento: any;
  listaChecklist: any;
  uploadedFiles: any[] = [];

  listaNucleo: any;
  listaMateria: any;
  listaPrioridadeTramitacao: any;
  listaSigiloSegredoJustica: any;
  listaSolicitadaUrgencia: any;
  listaOrigem: any;
  listaMotivoSigiloSegredoJustica: any;
  listaOrgao: any;
  listaInteressado: Interessado[] = [];
  solicitadaUrgenciaSelecionado: any;

  lbProponente: string = "Proponente";
  lbSelecione: string = AppConstants.SELECIONE;
  lbMotivo: string = "Motivo";
  lbNProcessoNaOrigem: string = "Nº do processo origem (SEI)";
  lbInteressados: string = "Interessados";
  lbMateria: string = "Matéria";
  lbAssunto: string = "Assunto";
  lbSubAssunto: string = "Sub-assunto";
  lbObjeto: string = "Objeto";
  lbPrioridadeTramitacao: string = "Prioridade de Tramitação";
  lbSigiloOuSegredoDeJustica: string = "Sigilo ou segredo de justiça";
  lbSolicitadaUrgencia: string = "Solicitada urgência";
  lbObservacoes: string = "Observações";
  lbBtnSalvar: string = AppConstants.BTN_SALVAR;
  lbBtnEnviar: string = "Enviar";
  lbSelecionarArquivo: string = AppConstants.SELECIONE_ARQUIVO;
  lbOrgao: string = "Órgão";
  lbNome: string = "Nome";
  lbEmail: string = "E-mail";
  lbTelefone: string = "Telefone";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;

  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  constructor(
    private service: ProcessoService,
    public dialogService: DialogService,
    private origemService: OrigemService,
    private materiaService: MateriaService,
    private tipoProcessoService: TipoProcessoService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private motivoSigiloSegredoJusticaService: MotivoSigiloSegredoJusticaService,
    private prioridadeTramitacaoService: PrioridadeTramitacaoService,
    private sigiloSegredoJusticaService: SigiloSegredoJusticaService,
    private checklistService: ChecklistService,
    private route: ActivatedRoute
    ) {
    this.buscarTodosOrigem();
    this.buscarTodosMateria();
    this.buscarTodosPrioridadeTramitacao();
    this.buscarTodosSigiloSegredoJustica();
    this.buscarTodosMotivoSigiloSegredoJustica();
    this.buscarSemPrioridadeTramitacao();
    this.buscarSemSigilo();
    this.carregarEntity();
  }

  ngOnInit() {
    this.entity.solicitadaUrgencia = false;
    this.solicitadaUrgenciaSelecionado = "0";
  }

  showInteressado() {
    const ref = this.dialogService.open(InteressadoDialogComponent, {
      header: 'Interessado',
      width: '70%',
      contentStyle: {"max-height": "350px", "height": "500px", "overflow": "auto"}
    });

    ref.onClose.subscribe((interessado: Interessado) => {
      if (interessado) {
        this.listaInteressado.push(interessado);
        // adicionar na lista
      }
    });
  }

  excluirInteressado(item: Interessado) {
    this.listaInteressado.splice(this.listaInteressado.indexOf(item), 1);
  }

  buscarTodosPrioridadeTramitacao() {
    this.prioridadeTramitacaoService.findAll().subscribe(
			data => {
        this.listaPrioridadeTramitacao = data
			},
			error => console.log(error)
    );
  }

  buscarTodosSigiloSegredoJustica() {
    this.sigiloSegredoJusticaService.findAll().subscribe(
			data => {
        this.listaSigiloSegredoJustica = data
			},
			error => console.log(error)
    );
  }

  buscarTodosMotivoSigiloSegredoJustica() {
    this.motivoSigiloSegredoJusticaService.findAll().subscribe(
			data => {
        this.listaMotivoSigiloSegredoJustica = data
			},
			error => console.log(error)
    );
  }

  buscarTodosOrigem() {
    this.origemService.findAll().subscribe(
			data => {
        this.listaOrigem = data,
        this.listaOrgao = data
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

  buscarSemPrioridadeTramitacao() {
    let entity: any;
    this.prioridadeTramitacaoService.findById(EnumPrioridadeTramitacao.SEM_PRIORIDADE).subscribe(
			data => {
        entity = data,
        this.entity.prioridadeTramitacao = entity
			},
			error => console.log(error)
    );
  }

  buscarSemSigilo() {
    let entity: any;
    this.sigiloSegredoJusticaService.findById(EnumSigiloSegredoJustica.SEM_SIGILO).subscribe(
			data => {
        entity = data,
        this.entity.sigiloSegredoJustica = entity
			},
			error => console.log(error)
    );
  }

  /**
   * Mocky
   */
  carregarEntity() {
    this.route.params.forEach((params: Params) => {
      if (this.route.params['value']['id'] !== undefined) {
        const id = this.route.params['value']['id'];

        this.service.findAll().subscribe(
          data => {
            this.findById(id, data)
          },
          error => console.log(error)
        );
      }
    });
  }

   /**
   * Mocky
   */
  findById(id: number, listaPesquisa: any) {
    for (var i = 0; i < listaPesquisa.length; i++) {
      let processo = listaPesquisa[i];
			if (id == processo['id']) {
        this.entity.id = processo['id'];
        this.entity.numeroProcesso = processo['numeroProcesso'];
			}
		}
  }

  onchangeDropOrigem() {
    this.limparDropTipoProcesso();
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();
    this.onchangeDropMateria();
  }

  onchangeDropMateria() {
    this.limparDropTipoProcesso();
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();

    if (!AppUtil.isNull(this.entity.origem) && !AppUtil.isNull(this.entity.materia)) {
      this.tipoProcessoService.filtrar(
        null,
        null,
        null,
        null,
        this.entity.materia.id,
        this.entity.origem.id
        ).subscribe(

        data => {
          this.listaTipoProcesso = data
        },
        error => console.log(error)
      );
    }
  }

  onchangeDropTipoProcesso() {
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();

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
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();

    if (!AppUtil.isNull(this.entity.termoGeral)) {
      this.termoEspecificoService.filtrar(
        null,
        this.entity.tipoProcesso.id,
        this.entity.termoGeral.id,
        null,
        this.entity.materia.id
      ).subscribe(data => {
        this.listaTermoEspecifico = data
      },
        error => console.log(error)
      );
    }
  }

  onchangeDropSubAssunto() {
    this.limparTableDocumento();

    if (!AppUtil.isNull(this.entity.termoEspecifico)) {
      this.checklistService.filtrar(
        null,
        this.entity.tipoProcesso.id,
        this.entity.termoGeral.id,
        this.entity.termoEspecifico.id,
        null,
        this.entity.materia.id
      ).subscribe(data => {
        this.listaChecklist = data
      },
        error => console.log(error)
      );
    }
  }

  showPrioridadeTramitacao(): boolean {
    if (!AppUtil.isNull(this.entity.prioridadeTramitacao) && EnumPrioridadeTramitacao.SEM_PRIORIDADE !== this.entity.prioridadeTramitacao.id) {
      return true;
    }
    this.entity.documentoComprobatorio = null;
    return false;
  }

  showMotivoSigiloOuSegredoJustica(): boolean {
    if (!AppUtil.isNull(this.entity.sigiloSegredoJustica) && EnumSigiloSegredoJustica.SEM_SIGILO !== this.entity.sigiloSegredoJustica.id) {
      return true;
    }
    this.entity.motivoSigiloSegredoJustica = null;
    return false;
  }

  showJustificativaSolicitadaUrgencia(): boolean {
    this.entity.justificativa = null;
    return this.solicitadaUrgenciaSelecionado === '1';
  }

  limparDropTipoProcesso() {
    this.listaTipoProcesso = null;
    this.entity.tipoProcesso = null;
  }

  limparDropTermoGeral() {
    this.listaTermoGeral = null;
    this.entity.termoGeral = null;
  }

  limparDropTermoEspecifico() {
    this.listaTermoEspecifico = null;
    this.entity.termoEspecifico = null;
  }

  limparTableDocumento() {
    this.listaDocumento = null;
    this.listaChecklist = null;
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
