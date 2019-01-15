import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgLogin: string = "Login";
  loginForm: FormGroup;
  loading = false;
  emailNulo = false;
  senhaNulo = false;
  returnUrl: string;
  home: string = "/ingresso-processos";
  email: string;
  senha: string;

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
      this.emailNulo = false;
      this.senhaNulo = false;

      if (this.email === '' || this.email === null || this.email === undefined) {
        this.emailNulo = true;
      }
      if (this.senha === '' || this.senha === null || this.senha === undefined) {
        this.senhaNulo = true;
      }
      if (this.emailNulo || this.senhaNulo) {
        return;
      }

        this.loading = true;

        this.authenticationService.login().subscribe(
          data => {
            this.router.navigate([this.home])
          },
          error => alert(error), () => console.log("loginTemp ok.")
         );
    }
}
