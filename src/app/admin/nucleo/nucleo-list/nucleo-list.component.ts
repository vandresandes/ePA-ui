import { AppConstants } from './../../../app-constants';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';
import { NucleoService } from 'src/app/service/nucleo.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { NucleoDto } from 'src/app/dto/nucleo-dto';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';

@Component({
  selector: 'app-nucleo-list',
  templateUrl: './nucleo-list.component.html',
  styleUrls: ['./nucleo-list.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class NucleoListComponent implements OnInit {

  entity: NucleoDto = new NucleoDto();
  listaPesquisa: any;
  nome: string = null;
  titulo: string = "Núcleo";

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();

  constructor(
    private service: NucleoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {}


  pesquisar() {
    console.log(this.paginacao);
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
  }

  voltar() {
    this.router.navigate([`/`]);
  }

  visualizar(id: number) {
    const link = ['/nucleo/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/nucleo/editar', id];
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
    this.router.navigate([`/nucleo/cadastro`]);
  }
}
