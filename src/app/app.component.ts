import { Subscriber } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params, ActivationStart } from '@angular/router';
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

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.carregarItems();
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ActivationStart) {
        this.title = routerEvent.snapshot.data['title'];
      }
    });
  }

  carregarItems() {
    this.items = [
      {
        label: 'Processo',
        items: [
          { label: 'Ingresso de Processo', command: (event) =>  this.router.navigate(['/ingressoprocesso']) }
        ]
      },
      {
        label: 'Manutenção',
        items: [
          { label: 'Núcleo', command: (event) =>  this.router.navigate(['/nucleo/pesquisa'])},
          { label: 'Tipo de Processo', command: (event) =>  this.router.navigate(['/tipoprocesso/pesquisa']) },
          { label: 'Termo Geral', command: (event) =>  this.router.navigate(['/termogeral/pesquisa']) },
          { label: 'Termo Específico', command: (event) =>  this.router.navigate(['/termoespecifico/pesquisa']) },
          { label: 'Documento', command: (event) =>  this.router.navigate(['/documento/pesquisa']) },
          { label: 'Checklist', command: (event) =>  this.router.navigate(['/checklist/pesquisa']) }
        ]
      },
      {
        label: 'Sair', icon: 'fa fa-sign-out', command: (event) =>  this.logout()
      }
    ];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
