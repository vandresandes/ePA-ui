import { AppUtil } from 'src/app/app-util';
import { AppConstants } from './../../../app-constants';
import { ChecklistService } from './../../../service/checklist.service';
import { Checklist } from './../../../model/checklist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { NucleoService } from 'src/app/service/nucleo.service';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { DocumentoService } from 'src/app/service/documento.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-checklist-cadastro',
  templateUrl: './checklist-cadastro.component.html',
  styleUrls: ['./checklist-cadastro.component.scss']
})
export class ChecklistCadastroComponent implements OnInit {

  entity: Checklist = new Checklist();
  obrigatorio: string;
  readonly: boolean = false;
  listaNucleo: any;
  listaTipoProcesso: any;
  listaTermoGeral: any;
  listaTermoEspecifico: any;
  listaDocumento: any;
  msgs: Message[] = [];
  val2: boolean = true;
  lbSelecione: string = AppConstants.SELECIONE;
  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  lbNucleo: string = "Núcleo";
  lbTipoprocesso: string = "Tipo de Processo";
  lbTermoGeral: string = "Termo Geral";
  lbTermoEspecifico: string = "Termo Específico";
  lbDocumento: string = "Documento";
  lbTipo: string = "Tipo";
  lbPrioridade: string = "Prioridade";
  msgNaoEncontrado: string = AppConstants.NAO_ENCONTRADO;


  constructor(
    private service: ChecklistService,
    private route: ActivatedRoute,
    private router: Router,
    private nucleoService: NucleoService,
    private tipoProcessoService: TipoProcessoService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private documentoService: DocumentoService)
  {
    this.carregarParams();
    this.buscarNucleoPorNome();
    this.buscarDocumentoPorNome();
    this.buscarTermoEspecificoPorNome();
    this.buscarTermoGeralPorNome();
    this.buscarTipoProcessoPorNome();
  }

  ngOnInit() { }

  carregarParams() {
    this.route.params.forEach((params: Params) => {
      const id = this.route.params['value']['id'];

      if (!AppUtil.isNull(id)) {
        this.readonly = this.route['data']['value']['acao'] == EnumCrud.READ;

        this.labelBtnCancelar = AppConstants.BTN_VOLTAR;
        this.service.findById(id).subscribe(
          data => {
            this.entity.id = data['id'],
            this.entity.nucleo = data['nucleo'],
            this.entity.tipoProcesso = data['tipoProcesso'],
            this.entity.termoGeral = data['termoGeral'],
            this.entity.termoEspecifico = data['termoEspecifico'],
            this.entity.documento = data['documento'],
            this.entity.obrigatorio = data['obrigatorio'],
            this.entity.prioridade = data['prioridade'],
            this.obrigatorio = data['obrigatorio']
          },
          error => console.log(error)
        );
      }
    });
  }

  salvar() {
    if (this.isValidSalvar()) {
      this.entity.obrigatorio = this.obrigatorio === '1';
      this.service.save(this.entity).subscribe(
        data => {
          console.log(data),

          this.verificarCadastro(data)
        },
        error => console.log(error)
      );
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (AppUtil.isNull(this.entity.nucleo)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbNucleo});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.tipoProcesso)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTipoprocesso});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.termoGeral)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTermoGeral});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.termoEspecifico)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTermoEspecifico});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.documento)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbDocumento});
      valid = false;
    }
    if (AppUtil.isNull(this.obrigatorio)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTipo});
      valid = false;
    }
    if (AppUtil.isNull(this.entity.prioridade)) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbPrioridade});
      valid = false;
    }
    return valid;
  }

  verificarCadastro(data: any) {
    let status: number = data['status'];
    if (status === 201) {
      let id: number = data['body']['id'];
      this.editar(id);
      this.msgs.push({severity:'success', summary:"Cadastrado com sucesso!"});
    } else {
      // verificar se ocorreu error(s)
    }
  }

  editar(id: number) {
    const link = ['/checklist/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`checklist/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

  buscarNucleoPorNome() {
    this.nucleoService.findAll().subscribe(
			data => {
        this.listaNucleo = data
			},
			error => console.log(error)
    );
  }

  buscarTipoProcessoPorNome() {
    this.tipoProcessoService.findAll().subscribe(
			data => {
        this.listaTipoProcesso = data
			},
			error => console.log(error)
    );
  }

  buscarTermoGeralPorNome() {
    this.termoGeralService.findAll().subscribe(
			data => {
        this.listaTermoGeral = data
			},
			error => console.log(error)
    );
  }

  buscarTermoEspecificoPorNome() {
    this.termoEspecificoService.findAll().subscribe(
			data => {
        this.listaTermoEspecifico = data
			},
			error => console.log(error)
    );
  }

  buscarDocumentoPorNome() {
    this.documentoService.findAll().subscribe(
			data => {
        this.listaDocumento = data
			},
			error => console.log(error)
    );
  }

}
