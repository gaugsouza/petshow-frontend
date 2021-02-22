import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sucesso-cadastro',
  templateUrl: './sucesso-cadastro.component.html',
  styleUrls: ['./sucesso-cadastro.component.scss'],
})
export class SucessoCadastroComponent implements OnInit {
  constructor(private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.validaRequisicao();
  }

  validaRequisicao() {
    this.route.queryParams.subscribe((params:Params) => {
      if (!params.token) {
        this.redirect();
      }
    });
  }

  redirect() {
    this.router.navigate(['/cadastro']);
  }
}
