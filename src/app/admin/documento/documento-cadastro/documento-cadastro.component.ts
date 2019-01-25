import { Message } from 'primeng/components/common/api';
import { DocumentoService } from './../../../service/documento.service';
import { Documento } from './../../../model/documento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AppConstants } from 'src/app/app-constants';
import { AppUtil } from 'src/app/app-util';

@Component({
  selector: 'app-documento-cadastro',
  templateUrl: './documento-cadastro.component.html',
  styleUrls: ['./documento-cadastro.component.scss']
})
export class DocumentoCadastroComponent implements OnInit {

  entity: Documento = new Documento();
  readonly: boolean = false;
  selectedValue: string;
  msgs: Message[] = [];
  lbDocumento: string = "Documento";
  lbTipo: string = "Tipo";
  labelBtnSalvar: string = AppConstants.BTN_SALVAR;
  labelBtnCancelar: string = AppConstants.BTN_CANCELAR;
  msgObrigatorio: string = AppConstants.CAMPO_OBRIGATORIO;


  constructor(
    private service: DocumentoService,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.carregarParams();
  }

  ngOnInit() {}

  carregarParams() {
    this.route.params.forEach((params: Params) => {
      const id = this.route.params['value']['id'];

      if (!AppUtil.isNull(id)) {
        this.readonly = this.route['data']['value']['acao'] == EnumCrud.READ;

        this.labelBtnCancelar = "Voltar";
        this.service.findById(id).subscribe(
          data => {
            this.entity.id = data['id'],
            this.entity.nome = data['nome'],
            this.entity.tipo = data['tipo']
          },
          error => console.log(error)
        );
      }
    });
  }

  salvar() {
    console.log(this.entity);

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
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbDocumento});
      valid = false;
    }
    if (this.entity.tipo === null || this.entity.tipo === undefined) {
      this.msgs.push({severity:'info', summary:this.msgObrigatorio, detail:this.lbTipo});
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
    const link = ['/documento/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`documento/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
