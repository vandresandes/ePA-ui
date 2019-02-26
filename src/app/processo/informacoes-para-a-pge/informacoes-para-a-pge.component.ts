import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';
import { AppConstants } from 'src/app/app-constants';
import { Processo, Checklist, Interessado } from 'src/app/model';
import { AppUtil } from 'src/app/app-util';
import { EnumPrioridadeTramitacao } from 'src/app/enums/enum-prioridade-tramitacao.enum';
import { EnumSigiloSegredoJustica } from 'src/app/enums/enum-sigilo-segredo-justica.enum';
import { DialogService, ConfirmationService, Message, SelectItem } from 'primeng/components/common/api';
import { OrgaoService } from 'src/app/service/orgao.service';
import { MateriaService } from 'src/app/service/materia.service';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { MotivoSigiloSegredoJusticaService } from 'src/app/service/motivo-sigilo-segredo-justica.service';
import { PrioridadeTramitacaoService } from 'src/app/service/prioridade-tramitacao.service';
import { SigiloSegredoJusticaService } from 'src/app/service/sigilo-segredo-justica.service';
import { ChecklistService } from 'src/app/service/checklist.service';
import { InteressadoDialogComponent } from 'src/app/dialog/interessado-dialog/interessado-dialog.component';

@Component({
  selector: 'app-informacoes-para-a-pge',
  templateUrl: './informacoes-para-a-pge.component.html',
  styleUrls: ['./informacoes-para-a-pge.component.scss'],
  entryComponents: [InteressadoDialogComponent],
  providers: [DialogService, ConfirmationService]
})
export class InformacoesParaAPgeComponent implements OnInit {

  entity: Processo = new Processo();
  msgs: Message[] = [];
  listaOrgaoTemplate: SelectItem[] = [];
  listaChecklistTemplate: SelectItem[] = [];
  orgaoSelecionado: any;

  listaTermoGeral: any;
  listaTermoEspecifico: any;
  listaDocumento: any;
  listaChecklist: any;
  listaChecklistComNumeroDocSei: Checklist[] = [];
  uploadedFiles: any[] = [];

  listaNucleo: any;
  listaMateria: any;
  listaPrioridadeTramitacao: any;
  listaSigiloSegredoJustica: any;
  listaSolicitadaUrgencia: any;
  listaMotivoSigiloSegredoJustica: any;
  listaOrgao: any;
  listaSimNao: any;
  listaInteressado: Interessado[] = [];
  solicitadaUrgenciaSelecionado: any;
  checklistSelecionado: Checklist;
  numeroDocumentoSEI: string;

  lbProponente: string = "Proponente";
  lbSelecione: string = AppConstants.SELECIONE;
  lbMotivo: string = "Motivo";
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
  lbTelefone: string = "Telefone";
  lbItem: string = "Item";
  lbOrgao: string = "Órgão";
  lbNome: string = "Nome";
  lbEmail: string = "E-mail";
  lbInformeONumeroDocumentoSei: string = "Informe o número do documento no SEI";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;
  data: any;

  @Input() retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;
  @Output() outputListaChecklist = new EventEmitter();
  @Output() outputListaChecklistTemplate =  new EventEmitter();

  constructor(
    public dialogService: DialogService,
    private orgaoService: OrgaoService,
    private materiaService: MateriaService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private motivoSigiloSegredoJusticaService: MotivoSigiloSegredoJusticaService,
    private prioridadeTramitacaoService: PrioridadeTramitacaoService,
    private sigiloSegredoJusticaService: SigiloSegredoJusticaService,
    private checklistService: ChecklistService
    ) {
    this.buscarTodosOrigem();
    this.buscarTodosMateria();
    this.buscarTodosPrioridadeTramitacao();
    this.buscarTodosSigiloSegredoJustica();
    this.buscarTodosMotivoSigiloSegredoJustica();
    this.buscarSemPrioridadeTramitacao();
    this.buscarSemSigilo();
    this.listaSimNao = [{id: 1, label: "Sim"}, {id: 0, label: "Não"}];
  }

  ngOnInit() {
    this.entity.solicitadaUrgencia = false;
    this.solicitadaUrgenciaSelecionado = "0";
  }

  showPrioridadeTramitacao(): boolean {
    if (!AppUtil.isNull(this.entity.prioridadeTramitacao) && EnumPrioridadeTramitacao.SEM_PRIORIDADE !== this.entity.prioridadeTramitacao['valor']) {
      return true;
    }
    this.entity.documentoComprobatorio = null;
    return false;
  }

  showMotivoSigiloOuSegredoJustica(): boolean {
    if (!AppUtil.isNull(this.entity.sigiloSegredoJustica) && EnumSigiloSegredoJustica.SEM_SIGILO !== this.entity.sigiloSegredoJustica['valor']) {
      return true;
    }
    this.entity.motivoSigiloSegredoJustica = null;
    return false;
  }

  showJustificativaSolicitadaUrgencia(): boolean {
    this.entity.justificativa = null;
    return this.solicitadaUrgenciaSelecionado === '1';
  }

  buscarTodosOrigem() {
    this.orgaoService.findAll().subscribe(
			data => {
        this.listaOrgao = data,
        this.listaOrgao.forEach(element => {
          this.listaOrgaoTemplate.push({label: `${element['nome']} - ${element['descricao']} `, value: element});
        });
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
    this.prioridadeTramitacaoService.buscarPorValor(EnumPrioridadeTramitacao.SEM_PRIORIDADE).subscribe(
			data => {
        entity = data,
        this.entity.prioridadeTramitacao = entity
			},
			error => console.log(error)
    );
  }

  buscarSemSigilo() {
    let entity: any;
    this.sigiloSegredoJusticaService.buscarPorValor(EnumSigiloSegredoJustica.SEM_SIGILO).subscribe(
			data => {
        entity = data,
        this.entity.sigiloSegredoJustica = entity
			},
			error => console.log(error)
    );
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

  onchangeDropOrigem() {
    this.limparDropMateria();
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();
    this.onchangeDropMateria();
    this.enviarOutputListaChecklist();
    this.enviarOutputListaChecklistTemplate();
  }

  onchangeDropMateria() {
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();
    this.enviarOutputListaChecklist();
    this.enviarOutputListaChecklistTemplate();

    if (!AppUtil.isNull(this.entity.materia)) {
      this.termoGeralService.filtrar(
        null,
        null,
        null,
        null,
        this.entity.materia.id,
        this.entity.origem.id
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
    this.enviarOutputListaChecklist();
    this.enviarOutputListaChecklistTemplate();

    if (!AppUtil.isNull(this.entity.termoGeral)) {
      this.termoEspecificoService.filtrar(
        null,
        null,
        this.entity.termoGeral.id,
        null,
        this.entity.materia.id,
        this.entity.origem.id
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
        null,
        this.entity.termoGeral.id,
        this.entity.termoEspecifico.id,
        null,
        this.entity.materia.id,
        this.entity.origem.id
      ).subscribe(data => {
        this.listaChecklist = data,
        this.listaChecklist.forEach(element => {
          this.listaChecklistTemplate.push({label: `${element['documento']['nome']} - ${this.obterStatus(element)}`, value: element});
        }),
        this.enviarOutputListaChecklist(),
        this.enviarOutputListaChecklistTemplate()
      },
        error => console.log(error)
      );
    }
  }

  obterStatus(element: any): string {
    return element['obrigatorio'] ? 'Obrigatório' : 'Complementar';
  }

  limparDropTermoGeral() {
    this.listaTermoGeral = null;
    this.entity.termoGeral = null;
  }

  limparDropTermoEspecifico() {
    this.listaTermoEspecifico = null;
    this.entity.termoEspecifico = null;
  }

  limparDropMateria() {
    this.entity.materia = null;
  }

  limparTableDocumento() {
    this.listaDocumento = null;
    this.listaChecklist = null;
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

  enviarOutputListaChecklist() {
    this.outputListaChecklist.emit(this.listaChecklist);
  }

  enviarOutputListaChecklistTemplate() {
    this.outputListaChecklistTemplate.emit(this.listaChecklistTemplate);
  }

}
