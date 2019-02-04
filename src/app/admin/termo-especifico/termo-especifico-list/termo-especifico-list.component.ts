import { Message } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { TermoEspecificoDto } from 'src/app/dto/termo-especifico-dto';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-termo-especifico-list',
  templateUrl: './termo-especifico-list.component.html',
  styleUrls: ['./termo-especifico-list.component.scss'],
  providers: [ConfirmationService]
})
export class TermoEspecificoListComponent implements OnInit {

  entity: TermoEspecificoDto = new TermoEspecificoDto();
  listaPesquisa: any;
  titulo: string = "Termo Específico";
  listaNomeTermoEspecifico: any;
  msgs: Message[] = [];

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;

  constructor(
    private service: TermoEspecificoService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {}


  filtrarNomes(event: any) {
    let query = event.query;
    this.service.filtrarNomes(query).subscribe(
			data => {
        this.listaNomeTermoEspecifico = data

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
    const link = ['/termoespecifico/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/termoespecifico/editar', id];
    this.router.navigate(link);
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
        message: AppConstants.MSG_EXCLUIR_REGISTRO,
        header: 'Exclusão',
        icon: 'pi pi-info-circle',
        acceptLabel: AppConstants.BTN_EXCLUIR_REGISTRO_SIM,
        rejectLabel: AppConstants.BTN_EXCLUIR_REGISTRO_NAO,
        accept: () => {
          this.excluir(id);
          this.msgs = [{severity:'info', summary:'Confirmado', detail: AppConstants.MSG_REGISTRO_EXCLUIDO}];
        },
        reject: () => {}
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
    this.router.navigate([`/termoespecifico/cadastro`]);
  }
}
