import { ChecklistPesquisaDto } from './../../../dto/checklist-pesquisa-dto';
import { Checklist } from './../../../model/checklist';
import { DocumentoService } from 'src/app/service/documento.service';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { TermoGeralService } from './../../../service/termo-geral.service';
import { TipoProcessoService } from './../../../service/tipo-processo.service';
import { ChecklistService } from './../../../service/checklist.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NucleoService } from 'src/app/service/nucleo.service';

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
    this.service.buscar(this.entity).subscribe(
			data => {
        this.listaPesquisa = data
			},
			error => console.log(error)
    );
  }

  limpar(form: any) {
    form.reset();
    this.listaPesquisa = null;
    this.listaNucleo = null;
    this.listaTipoProcesso = null;
    this.listaTermoGeral = null;
    this.listaTermoEspecifico = null;
    this.listaDocumento = null;
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
