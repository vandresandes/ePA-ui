import { TermoGeral } from './../../../model/termoGeral';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { TermoGeralService } from 'src/app/service/termo-geral.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

@Component({
  selector: 'app-termo-geral-cadastro',
  templateUrl: './termo-geral-cadastro.component.html',
  styleUrls: ['./termo-geral-cadastro.component.scss'],
  providers: [MessageService]
})
export class TermoGeralCadastroComponent implements OnInit {

  entity: TermoGeral = new TermoGeral();
  labelBtnCancelar: string = "Cancelar";
  labelBtnSalvar: string = "Salvar";
  readonly: boolean = false;

  constructor(
    private service: TermoGeralService,
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
          console.log(data),
          console.log(data['status'])
        },
        error => console.log(error)
      );
    }
  }

  isValidSalvar(): boolean {
    let valid: boolean = true;
    if (this.entity.nome === null || this.entity.nome === undefined) {
      this.showError();
      valid = false;
    }
    return valid;
  }

  cancelar() {
    this.router.navigate([`termogeral/pesquisa`]);
  }

  contemId(): boolean {
   return this.entity.id !== null && this.entity.id !== undefined;
  }

  showError() {
    console.log("show");
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
}
}
