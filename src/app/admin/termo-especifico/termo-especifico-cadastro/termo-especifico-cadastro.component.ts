import { Message } from 'primeng/components/common/api';
import { TermoEspecifico } from './../../../model/termoEspecifico';
import { Component, OnInit } from '@angular/core';
import { TermoEspecificoService } from 'src/app/service/termo-especifico.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-termo-especifico-cadastro',
  templateUrl: './termo-especifico-cadastro.component.html',
  styleUrls: ['./termo-especifico-cadastro.component.scss']
})
export class TermoEspecificoCadastroComponent implements OnInit {

  entity: TermoEspecifico = new TermoEspecifico();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;
  msgObrigatorio: string = "Campo obrigatório:";
  msgs: Message[] = [];
  lbTermoEspecifico: string = "Termo Específico";

  constructor(
    private service: TermoEspecificoService,
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
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTermoEspecifico});
      valid = false;
    }
    return valid;
  }

  verificarCadastro(data: any) {
    let status: number = data['status'];
    if (status === 201) {
      let id: number = data['body']['id'];
      this.editar(id);
      this.msgs.push({severity:'success', summary:"Cadastrado com sucesso!"});
    } else {
      // verificar se ocorreu error(s)
    }
  }

  editar(id: number) {
    const link = ['/termoespecifico/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`termoespecifico/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
