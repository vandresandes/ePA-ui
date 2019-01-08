import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/service/documento.service';
import { Router } from '@angular/router';
import { DocumentoDto } from 'src/app/dto/documento-dto';
import { PaginacaoDto } from 'src/app/dto/paginacao-dto';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.scss']
})
export class DocumentoListComponent implements OnInit {

  entity: DocumentoDto = new DocumentoDto();
  listaPesquisa: any;
  titulo: string = "Documento";
  testando: string = "INFORMACAO";

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();

  constructor(
    private service: DocumentoService,
    private router: Router,
    ) { }

  ngOnInit() {}


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
  }

  voltar() {
    this.router.navigate([`/`]);
  }

  visualizar(id: number) {
    const link = ['/documento/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/documento/editar', id];
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
    this.router.navigate([`/documento/cadastro`]);
  }
}
