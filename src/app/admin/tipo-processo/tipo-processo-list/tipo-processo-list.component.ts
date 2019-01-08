import { TipoProcessoDto } from './../../../dto/tipo-processo-dto';
import { Component, OnInit } from '@angular/core';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';

@Component({
  selector: 'app-tipo-processo-list',
  templateUrl: './tipo-processo-list.component.html',
  styleUrls: ['./tipo-processo-list.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TipoProcessoListComponent implements OnInit {

  entity: TipoProcessoDto = new TipoProcessoDto();
  listaPesquisa: any;
  titulo: string = "Tipo de Processo";

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();

  constructor(
    private service: TipoProcessoService,
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
    const link = ['/tipoprocesso/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/tipoprocesso/editar', id];
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
    this.router.navigate([`/tipoprocesso/cadastro`]);
  }
}
