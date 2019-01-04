import { Message } from 'primeng/components/common/api';
import { TipoProcesso } from './../../../model/tipoProcesso';
import { Component, OnInit } from '@angular/core';
import { TipoProcessoService } from 'src/app/service/tipo-processo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-tipo-processo-cadastro',
  templateUrl: './tipo-processo-cadastro.component.html',
  styleUrls: ['./tipo-processo-cadastro.component.scss']
})
export class TipoProcessoCadastroComponent implements OnInit {

  entity: TipoProcesso = new TipoProcesso();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;
  msgObrigatorio: string = "Campo obrigatório:";
  msgs: Message[] = [];
  lbTipoProcesso: string = "Tipo de Processo";

  constructor(
    private service: TipoProcessoService,
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
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTipoProcesso});
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
    const link = ['/tipoprocesso/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`tipoprocesso/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
