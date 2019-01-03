import { Component, OnInit } from '@angular/core';
import { DocumentoService } from 'src/app/service/documento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.scss']
})
export class DocumentoListComponent implements OnInit {
  listaPesquisa: any;
  nome: string = null;
  titulo: string = "Documento";
  testando: string = "INFORMACAO";

  constructor(
    private service: DocumentoService,
    private router: Router,
    ) { }

  ngOnInit() {}


  pesquisar() {
    this.service.pesquisar(this.nome).subscribe(
			data => {
        this.listaPesquisa = data
			},
			error => console.log(error)
    );
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
