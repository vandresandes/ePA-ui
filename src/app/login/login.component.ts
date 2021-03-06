import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AppConstants } from '../app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgLogin: string = "Login";
  loginForm: FormGroup;
  emailNulo = false;
  senhaNulo = false;
  returnUrl: string;
  home: string = "/listadeprocesso";
  errorsUsername: boolean;
  errorsPassword: boolean;
  lbSelecione: string = AppConstants.SELECIONE;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      // redirecionar para home se já estiver logado
      if (this.authenticationService.currentUserValue) {
          this.router.navigate([this.home]);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // obter url de retorno dos parâmetros de rota ou padrão para home
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.home;
  }

  // conveniência getter para facilitar o acesso aos campos de formulário
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.errorsUsername = this.f.username.errors && this.f.username.errors.required;
    this.errorsPassword = this.f.password.errors && this.f.password.errors.required;

    // pare aqui se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
        error => {alert(error); console.log(error)}, () => console.log(`Login efetuado com sucesso!`)
      );
  }

}
