import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../servicos/local-storage.service';
import { UsuarioService } from '../../../servicos/usuario.service';
import { Prestador } from '../../../interfaces/prestador';


@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;

  constructor(private fb: FormBuilder, // Via DI, nós obtemos o FormBuilder.
    private formularioDeUsuario: FormGroup, // Aqui damos um nome para nosso formulário do tipo FormGroup

    private usuarioService:UsuarioService,

    private router:Router,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
  
  }

  cadastrarPrestador(prestador:Prestador) {
    this.usuarioService.cadastrarUsuario(prestador)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/prestador', id]);
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }

}
