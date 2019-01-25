import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoDto, PaginacaoDto } from 'src/app/dto';
import { ProcessoService } from 'src/app/service/processo.service';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-pesquisa-processo',
  templateUrl: './pesquisa-processo.component.html',
  styleUrls: ['./pesquisa-processo.component.scss']
})
export class PesquisaProcessoComponent implements OnInit {

  entity: ProcessoDto = new ProcessoDto();
  listaPesquisa: any;

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;

  constructor(
    private router: Router,
    private service: ProcessoService) {

    this.pesquisar();
  }

  ngOnInit() {
  }

  pesquisar() {
    this.service.findAll().subscribe(
      data => {
        this.listaPesquisa = data,
        this.paginacao.totalRecords = 5,
        this.paginacao.totalPages = 1
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

  visualizar(id: number) {
    const link = ['/ingressoprocesso', id];
    this.router.navigate(link);
  }

}
