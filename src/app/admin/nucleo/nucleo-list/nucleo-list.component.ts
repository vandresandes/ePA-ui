import { Message } from 'primeng/components/common/api';
import { MateriaService } from './../../../service/materia.service';
import { AppConstants } from './../../../app-constants';
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
  providers: [ConfirmationService]
})
export class NucleoListComponent implements OnInit {

  entity: NucleoDto = new NucleoDto();
  listaPesquisa: any;
  nome: string = null;
  titulo: string = "Núcleo";
  listaMateria: any;
  listaNomeNucleo: any;
  msgs: Message[] = [];

  // p-table
  paginacao: PaginacaoDto = new PaginacaoDto();
  msgNenhumRegistroEncontrado: string = AppConstants.NENHUM_REGISTRO_ENCONTRADO;
  msgNaoEncontrado: string = "Não encontrado!";

  constructor(
    private service: NucleoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private materiaService: MateriaService) { }

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

  filtrarNomes(event: any) {
    let query = event.query;
    this.service.filtrarNomes(query).subscribe(
			data => {
        this.listaNomeNucleo = data

			},
			error => console.log(error)
    );
  }

  buscarMateriaPorNome(event: any) {
    let query = event.query;
    this.materiaService.filtrarNomes(query).subscribe(
			data => {
        this.listaMateria = data

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
    const link = ['/nucleo/visualizar', id];
    this.router.navigate(link);
  }

  editar(id: number) {
    const link = ['/nucleo/editar', id];
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
    this.router.navigate([`/nucleo/cadastro`]);
  }
}
