import { AppConstants } from './app-constants';
import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user';
import { MenuItem } from 'primeng/components/common/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'epa-ui';
  logado: boolean = false;
  currentUser: User;
  items: MenuItem[];
  titulo: string = AppConstants.TITULO_SISTEMA;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ActivationStart) {
        this.title = routerEvent.snapshot.data['title'];
        this.carregarItems();
      }
    });
  }

  carregarItems() {
    this.items = null;

    if (this.currentUser) {

      this.items = [
        {
          label: 'Processo',
          items: [
            { label: 'Cadastrar', title: 'Cadastrar', command: (event) =>  this.router.navigate(['/listadeprocesso']) },
            { label: 'Acompanhar', title: 'Acompanhar', command: (event) =>  this.router.navigate(['/pesquisaprocesso']) }
          ]
        },
        {
          label: 'Manutenção',
          items: [
            { label: 'Núcleo', title: 'Núcleo', command: (event) =>  this.router.navigate(['/nucleo/pesquisa'])},
            { label: 'Tipo de Processo', title: 'Tipo de Processo', command: (event) =>  this.router.navigate(['/tipoprocesso/pesquisa']) },
            { label: 'Termo Geral', title: 'Termo Geral', command: (event) =>  this.router.navigate(['/termogeral/pesquisa']) },
            { label: 'Termo Específico', title: 'Termo Específico', command: (event) =>  this.router.navigate(['/termoespecifico/pesquisa']) },
            { label: 'Documento', title: 'Documento', command: (event) =>  this.router.navigate(['/documento/pesquisa']) },
            { label: 'Checklist', title: 'Checklist', command: (event) =>  this.router.navigate(['/checklist/pesquisa']) }
          ]
        },
        {
          label: 'Sair', icon: 'fa fa-sign-out', command: (event) =>  this.logout()
        }
      ];
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
