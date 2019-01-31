import { AppConstants } from 'src/app/app-constants';
import { TermoGeralDto } from './../../../dto/termo-geral-dto';
import { Component, OnInit } from '@angular/core';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { Router } from '@angular/router';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-termo-geral-list',
  templateUrl: './termo-geral-list.component.html',
  styleUrls: ['./termo-geral-list.component.scss'],
  providers: [ConfirmationService]
})
export class TermoGeralListComponent implements OnInit {

  entity: TermoGeralDto = new TermoGeralDto();
  listaPesquisa: any;
  titulo: string = "Termo Geral";
  listaNomeTermoGeral: any;

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;

  constructor(
    private service: TermoGeralService,
    private router: Router,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit() {}


  filtrarNomes(event: any) {
    let query = event.query;
    this.service.filtrarNomes(query).subscribe(
			data => {
        this.listaNomeTermoGeral = data

			},
			error => console.log(error)
    );
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
    this.paginacao = new PaginacaoDto();
  }

  voltar() {
    this.router.navigate([`/`]);
  }

  visualizar(id: number) {
    const link = ['/termogeral/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/termogeral/editar', id];
    this.router.navigate(link);
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(id);
      }
    });
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
    this.router.navigate([`/termogeral/cadastro`]);
  }
}
