import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Checklist } from './../../model/checklist';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { Message } from 'primeng/components/common/message';
import { ActivatedRoute, Params } from '@angular/router';
import { InteressadoDialogComponent } from 'src/app/dialog/interessado-dialog/interessado-dialog.component';
import { Processo, Interessado } from 'src/app/model';
import { AppConstants } from 'src/app/app-constants';
import { ProcessoService } from 'src/app/service/processo.service';
import { MateriaService } from 'src/app/service/materia.service';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { MotivoSigiloSegredoJusticaService } from 'src/app/service/motivo-sigilo-segredo-justica.service';
import { PrioridadeTramitacaoService } from 'src/app/service/prioridade-tramitacao.service';
import { SigiloSegredoJusticaService } from 'src/app/service/sigilo-segredo-justica.service';
import { ChecklistService } from 'src/app/service/checklist.service';
import { EnumPrioridadeTramitacao, EnumSigiloSegredoJustica } from 'src/app/enums';
import { AppUtil } from 'src/app/app-util';
import { OrgaoService } from 'src/app/service/orgao.service';
import { SeiService } from 'src/app/service/sei.service';
import { SelectItem } from 'primeng/components/common/api';
import { RetornoConsultaProcedimentoSEI } from 'src/app/model/sei/retorno-consulta-procedimento-sei';

@Component({
  selector: 'app-ingresso-de-processos',
  templateUrl: './ingresso-de-processos.component.html',
  styleUrls: ['./ingresso-de-processos.component.scss'],
  entryComponents: [InteressadoDialogComponent],
  providers: [DialogService, ConfirmationService]
})
export class IngressoDeProcessosComponent implements OnInit {

  entity: Processo = new Processo();
  retornoConsultaProcedimento: RetornoConsultaProcedimentoSEI;
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
  lbItem: string = "Item";
  lbInformeONumeroDocumentoSei: string = "Informe o número do documento no SEI";
  msgNenhumResultadoEncontrado: string = AppConstants.NENHUM_RESULTADO_ENCONTRADO;
  msgNenhumRegistroAdicionado: string = AppConstants.NENHUM_REGISTRO_ADICIONADO;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;
  data: any;

  retornoConsultaProcedimentoInput: RetornoConsultaProcedimentoSEI;

  constructor(
    private service: ProcessoService,
    public dialogService: DialogService,
    private orgaoService: OrgaoService,
    private materiaService: MateriaService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private motivoSigiloSegredoJusticaService: MotivoSigiloSegredoJusticaService,
    private prioridadeTramitacaoService: PrioridadeTramitacaoService,
    private sigiloSegredoJusticaService: SigiloSegredoJusticaService,
    private checklistService: ChecklistService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private seiService: SeiService
    ) {
    this.carregarParams();
    this.buscarTodosOrigem();
    this.buscarTodosMateria();
    this.buscarTodosPrioridadeTramitacao();
    this.buscarTodosSigiloSegredoJustica();
    this.buscarTodosMotivoSigiloSegredoJustica();
    this.buscarSemPrioridadeTramitacao();
    this.buscarSemSigilo();
    this.listaSimNao = [{id: 1, label: "Sim"}, {id: 0, label: "Não"}];

    this.retornoConsultaProcedimentoInput = new RetornoConsultaProcedimentoSEI();
    this.retornoConsultaProcedimentoInput.dataAutuacao = "01/01/1900";
  }

  ngOnInit() {
    this.entity.solicitadaUrgencia = false;
    this.solicitadaUrgenciaSelecionado = "0";
  }

  carregarParams() {
    this.route.params.forEach((params: Params) => {
      let protocoloProcedimento = this.route.params['value']['protocoloProcedimento'];
      this.entity.numeroProcesso = protocoloProcedimento;
      this.consultarProtocolo(protocoloProcedimento);
    });
  }

  consultarProtocolo(protocoloProcedimento: string) {
    let retorno: any;
    this.seiService.consultarProtocolo(protocoloProcedimento).subscribe(
      data => {
        retorno = data,
        this.retornoConsultaProcedimento = retorno,
        this.verificarUnidadesAbertas()
      },
      error => console.log(error)
    );
  }

  verificarUnidadesAbertas() {
    let numeroProcessos = this.retornoConsultaProcedimento.unidadesProcedimentoAberto ? this.retornoConsultaProcedimento.unidadesProcedimentoAberto.length : 0;
    if (numeroProcessos > 1) {
      this.msgs.push({severity:'info', summary:"Atenção!", detail:`Esse processo está aberto em ${numeroProcessos} unidades. Para o ingresso na PGE é necessário que ele seja fechado nas demais unidades.`});
    }
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

  onchangeDropOrigem() {
    this.limparDropMateria();
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();
    this.onchangeDropMateria();
  }

  onchangeDropMateria() {
    this.limparDropTermoGeral();
    this.limparDropTermoEspecifico();
    this.limparTableDocumento();

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
        });
      },
        error => console.log(error)
      );
    }
  }

  obterStatus(element: any): string {
    return element['obrigatorio'] ? 'Obrigatório' : 'Complementar';
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

  onClickRaddioButtonCondicao(item: any) {
    item['obrigatorio'] = item['condicaoAceita'] == 1;
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
      return false;
    }
  }

  isValidExisteDocumento() {
    let valid: any;
    this.seiService.existeDocumento(this.entity.numeroProcesso, this.numeroDocumentoSEI).subscribe(
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
      }
    );
  }

  confirmarExclusaoChecklist(item: any) {
    console.log(item);

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
    this.listaChecklistComNumeroDocSei.splice(this.listaInteressado.indexOf(item), 1);
  }

}
