import { Component, OnInit } from '@angular/core';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-termo-especifico-list',
  templateUrl: './termo-especifico-list.component.html',
  styleUrls: ['./termo-especifico-list.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TermoEspecificoListComponent implements OnInit {
  listaPesquisa: any;
  nome: string = null;
  titulo: string = "Termo Específico";

  constructor(
    private service: TermoEspecificoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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
    const link = ['/termoEspecifico/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/termoEspecifico/editar', id];
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
    this.router.navigate([`/termoespecifico/cadastro`]);
  }
}
