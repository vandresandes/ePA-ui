import { Message } from 'primeng/components/common/api';
import { TermoGeral } from './../../../model/termoGeral';
import { Component, OnInit } from '@angular/core';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-termo-geral-cadastro',
  templateUrl: './termo-geral-cadastro.component.html',
  styleUrls: ['./termo-geral-cadastro.component.scss']
})
export class TermoGeralCadastroComponent implements OnInit {

  entity: TermoGeral = new TermoGeral();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;
  msgObrigatorio: string = "Campo obrigatório:";
  msgs: Message[] = [];
  lbTermoGeral: string = "Termo Geral";

  constructor(
    private service: TermoGeralService,
    private route: ActivatedRoute,
    private router: Router
    )
  {
    this.route.params.forEach((params: Params) => {
      if (this.route.params['value']['id'] !== undefined) {
        const id = this.route.params['value']['id'];
        this.readonly = this.route['data']['value']['acao'] == EnumCrud.READ;

        this.labelBtnCancelar = "Voltar";
        this.service.findById(id).subscribe(
          data => {
            this.entity.id = data['id'],
            this.entity.nome = data['nome']
          },
          error => console.log(error)
        );
      }
    });
  }

  ngOnInit() {
  }

  salvar() {
    if (this.isValidSalvar()) {
      this.service.save(this.entity).subscribe(
        data => {
          this.verificarCadastro(data)
        },
        error => console.log(error)
      );
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    this.msgs = [];

    if (this.entity.nome === null || this.entity.nome === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTermoGeral});
      valid = false;
    }
    return valid;
  }

  verificarCadastro(data: any) {
    let status: number = data['status'];
    if (status === 201) {
      let id: number = data['body']['id'];
      this.editar(id);
    } else {
      // verificar se ocorreu error(s)
    }
  }

  editar(id: number) {
    const link = ['/termogeral/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`termogeral/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
