import { Message } from 'primeng/components/common/api';
import { TermoGeral } from './../../../model/termoGeral';
import { Component, OnInit } from '@angular/core';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AppConstants } from 'src/app/app-constants';
import { AppUtil } from 'src/app/app-util';

@Component({
  selector: 'app-termo-geral-cadastro',
  templateUrl: './termo-geral-cadastro.component.html',
  styleUrls: ['./termo-geral-cadastro.component.scss']
})
export class TermoGeralCadastroComponent implements OnInit {

  entity: TermoGeral = new TermoGeral();
  readonly: boolean = false;
  msgs: Message[] = [];
  lbTermoGeral: string = "Termo Geral";
  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  constructor(
    private service: TermoGeralService,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.carregarParams();
  }

  ngOnInit() {
  }

  carregarParams() {
    this.route.params.forEach((params: Params) => {
      const id = this.route.params['value']['id'];

      if (!AppUtil.isNull(id)) {
        this.readonly = this.route['data']['value']['acao'] == EnumCrud.READ;

        this.labelBtnCancelar = "Voltar";
        this.service.findById(id).subscribe(
          data => {
            this.entity.id = data['id'],
            this.entity.nome = data['nome']
          },
          error => {
            const status: number = error['status'];
            console.log(error);
            if (status == 404) {
              this.router.navigate(['/termogeral/pesquisa'])
            }
          }
        );
      }
    });
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
      this.msgs.push({severity:'success', summary:"Cadastrado com sucesso!"});
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
