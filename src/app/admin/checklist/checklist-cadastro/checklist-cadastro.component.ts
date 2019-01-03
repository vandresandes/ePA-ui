import { ChecklistService } from './../../../service/checklist.service';
import { Checklist } from './../../../model/checklist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-checklist-cadastro',
  templateUrl: './checklist-cadastro.component.html',
  styleUrls: ['./checklist-cadastro.component.scss']
})
export class ChecklistCadastroComponent implements OnInit {

  entity: Checklist = new Checklist();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;

  constructor(
    private service: ChecklistService,
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
            this.entity.nucleo = data['nucleo'],
            this.entity.tipoProcesso = data['tipoProcesso'],
            this.entity.termoGeral = data['termoGeral'],
            this.entity.termoEspecifico = data['termoEspecifico'],
            this.entity.documento = data['documento'],
            this.entity.status = data['status']
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
    if (this.entity.nucleo === null || this.entity.nucleo === undefined) {
      valid = false;
    }
    if (this.entity.tipoProcesso === null || this.entity.tipoProcesso === undefined) {
      valid = false;
    }
    if (this.entity.termoGeral === null || this.entity.termoGeral === undefined) {
      valid = false;
    }
    if (this.entity.termoEspecifico === null || this.entity.termoEspecifico === undefined) {
      valid = false;
    }
    if (this.entity.status === null || this.entity.status === undefined) {
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
    const link = ['/checklist/editar', id];
    this.router.navigate(link);
  }

  cancelar() {
    this.router.navigate([`checklist/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

}
