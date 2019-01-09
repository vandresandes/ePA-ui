import { ChecklistPesquisaDto } from './../../../dto/checklist-pesquisa-dto';
import { DocumentoService } from 'src/app/service/documento.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { TermoGeralService } from './../../../service/termo-geral.service';
import { TipoProcessoService } from './../../../service/tipo-processo.service';
import { ChecklistService } from './../../../service/checklist.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NucleoService } from 'src/app/service/nucleo.service';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.scss']
})
export class ChecklistListComponent implements OnInit {

  entity: ChecklistPesquisaDto = new ChecklistPesquisaDto();
  listaPesquisa: any;
  nome: string = null;
  titulo: string = "Checklist";
  listaNucleo: any;
  listaTipoProcesso: any;
  listaTermoGeral: any;
  listaTermoEspecifico: any;
  listaDocumento: any;
  msgNaoEncontrado: string = "Não encontrado!";

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;

  constructor(
    private service: ChecklistService,
    private router: Router,
    private nucleoService: NucleoService,
    private tipoProcessoService: TipoProcessoService,
    private termoGeralService: TermoGeralService,
    private termoEspecificoService: TermoEspecificoService,
    private documentoService: DocumentoService
    ) { }

  ngOnInit() {

  }

  pesquisar() {
    this.service.buscarPaginado(this.entity, this.paginacao).subscribe(
      data => {
        this.listaPesquisa = data['content'],
        this.paginacao.totalRecords = data['totalElements'],
        this.paginacao.totalPages = data['totalPages']
			},
			error => console.log(error)
    );
  }

  paginate(event: any) {
    this.paginacao.totalRecords = event.totalRecords;
    this.paginacao.rows = event.rows;
    this.paginacao.first = event.first;
    this.paginacao.page = event.page;
    this.pesquisar();
  }

  limpar(form: any) {
    form.reset();
    this.listaPesquisa = null;
    this.listaNucleo = null;
    this.listaTipoProcesso = null;
    this.listaTermoGeral = null;
    this.listaTermoEspecifico = null;
    this.listaDocumento = null;
    this.paginacao = new PaginacaoDto();
  }

  voltar() {
    this.router.navigate([`/`]);
  }

  visualizar(id: number) {
    const link = ['/checklist/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/checklist/editar', id];
    this.router.navigate(link);
  }

  excluir(id: number) {
    this.service.deleteById(id).subscribe(
		 	data => {
        console.log(data),
        this.pesquisar()
		 	},
		 	error => console.log(error)
		);
  }

  novo() {
    this.router.navigate([`/checklist/cadastro`]);
  }

  buscarNucleoPorNome(event: any) {
    let query = event.query;
    this.nucleoService.pesquisarNomes(query).subscribe(
			data => {
        this.listaNucleo = data
			},
			error => console.log(error)
    );
  }

  buscarTipoProcessoPorNome(event: any) {
    let query = event.query;
    this.tipoProcessoService.pesquisarNomes(query).subscribe(
			data => {
        this.listaTipoProcesso = data
			},
			error => console.log(error)
    );
  }

  buscarTermoGeralPorNome(event: any) {
    let query = event.query;
    this.termoGeralService.pesquisarNomes(query).subscribe(
			data => {
        this.listaTermoGeral = data
			},
			error => console.log(error)
    );
  }

  buscarTermoEspecificoPorNome(event: any) {
    let query = event.query;
    this.termoEspecificoService.pesquisarNomes(query).subscribe(
			data => {
        this.listaTermoEspecifico = data
			},
			error => console.log(error)
    );
  }

  buscarDocumentoPorNome(event: any) {
    let query = event.query;
    this.documentoService.pesquisarNomes(query).subscribe(
			data => {
        this.listaDocumento = data
			},
			error => console.log(error)
    );
  }
}
