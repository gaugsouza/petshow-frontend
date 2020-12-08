import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-token-ativacao',
  templateUrl: './token-ativacao.component.html',
  styleUrls: ['./token-ativacao.component.scss'],
})
export class TokenAtivacaoComponent implements OnInit {
  possuiErros:boolean = false;

  mensagemErro:string = '';

  constructor(private route:ActivatedRoute,
              private router:Router,
              private service: LoginService) { }

  ngOnInit(): void {
    this.ativaConta();
  }

  ativaConta() {
    this.route.queryParams.subscribe((params:Params) => {
      const { token } = params;
      if (!token) {
        this.possuiErros = true;
        return;
      }
      this.service.ativaConta(token).subscribe(() => {
        this.redirect();
      },
      (err) => {
        this.possuiErros = true;
        this.mensagemErro = typeof err === 'string' ? err : 'ERRO_ATIVACAO_TOKEN';
      });
    });
  }

  redirect() {
    this.router.navigate(['/login'], { queryParams: { ativo: true } });
  }
}
