import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-token-ativacao',
  templateUrl: './token-ativacao.component.html',
  styleUrls: ['./token-ativacao.component.scss']
})
export class TokenAtivacaoComponent implements OnInit {
  possuiErros:boolean = false;
  mensagemErro:string = "";

  constructor(private route:ActivatedRoute,
              private router:Router,
              private service: LoginService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      let token:string = params.token;
      if(!token) {
        this.possuiErros = true;
        return;
      }
      this.service.ativaConta(token).subscribe(res => {
        this.router.navigate(['/login'], {queryParams: {ativo: true}});
      },
      err => {
        this.mensagemErro = typeof err === 'string' ? err : 'Ocorreu um erro durante a ativação';
      });
      
    });
  }

}
