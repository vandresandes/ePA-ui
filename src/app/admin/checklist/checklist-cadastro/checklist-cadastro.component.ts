import { ChecklistService } from './../../../service/checklist.service';
import { Checklist } from './../../../model/checklist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-checklist-cadastro',
  templateUrl: './checklist-cadastro.component.html',
  styleUrls: ['./checklist-cadastro.component.scss'],
  providers: [MessageService]
})
export class ChecklistCadastroComponent implements OnInit {

  entity: Checklist = new Checklist();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;

  constructor(
    private service: ChecklistService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    )
  {
    this.route.params.forEach((params: Params) => {
      if (this.route.params['value']['id'] !== undefined) {
        const id = this.route.params['value']['id'];
        this.readonly = this.route['data']['value']['acao'] == EnumCrud.READ;
        console.log("readonly: "+this.readonly);

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
          console.log(data),
          console.log(data['status'])
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

  cancelar() {
    this.router.navigate([`checklist/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

  showError() {
    console.log("show");
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
  }
}
