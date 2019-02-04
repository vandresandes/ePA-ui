import { Message } from 'primeng/components/common/api';
import { TipoProcessoDto } from './../../../dto/tipo-processo-dto';
import { Component, OnInit } from '@angular/core';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-tipo-processo-list',
  templateUrl: './tipo-processo-list.component.html',
  styleUrls: ['./tipo-processo-list.component.scss'],
  providers: [ConfirmationService]
})
export class TipoProcessoListComponent implements OnInit {

  entity: TipoProcessoDto = new TipoProcessoDto();
  listaPesquisa: any;
  titulo: string = "Tipo de Processo";
  listaNomeTipoProcesso: any;
  msgs: Message[] = [];

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;

  constructor(
    private service: TipoProcessoService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {}


  filtrarNomes(event: any) {
    let query = event.query;
    this.service.filtrarNomes(query).subscribe(
			data => {
        this.listaNomeTipoProcesso = data

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
    const link = ['/tipoprocesso/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/tipoprocesso/editar', id];
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
          console.log(this.msgs);
        },
        reject: () => {}
    });
  }

  excluir(id: number) {
    this.service.deleteById(id).subscribe(
		 	data => {
        this.pesquisar()
		 	},
		 	error => console.log(error)
		);
  }

  novo() {
    this.router.navigate([`/tipoprocesso/cadastro`]);
  }
}
