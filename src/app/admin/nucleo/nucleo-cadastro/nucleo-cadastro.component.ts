import { Message } from 'primeng/components/common/api';
import { EnumCrud } from './../../../enums/enum-crud.enum';
import { Nucleo } from 'src/app/model/nucleo';
import { Component, OnInit } from '@angular/core';
import { NucleoService } from 'src/app/service/nucleo.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-nucleo-cadastro',
  templateUrl: './nucleo-cadastro.component.html',
  styleUrls: ['./nucleo-cadastro.component.scss']
})
export class NucleoCadastroComponent implements OnInit {

  entity: Nucleo = new Nucleo();
  readonly: boolean = false;
  msgs: Message[] = [];
  lbNucleo: string = "Núcleo";
  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;

  constructor(
    private service: NucleoService,
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
      let status: number;
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
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbNucleo});
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
    const link = ['/nucleo/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`nucleo/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
