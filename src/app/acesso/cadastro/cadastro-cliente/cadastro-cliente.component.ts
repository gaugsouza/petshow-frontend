import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../servicos/local-storage.service';
import { UsuarioService } from '../../../servicos/usuario.service';
import { Cliente } from '../../../interfaces/cliente';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;

  constructor(
    private usuarioService:UsuarioService,

    private router:Router,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
  
  }

  cadastrarCliente(cliente:Cliente) {
    this.usuarioService.cadastrarUsuario(cliente)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/cliente', id]);
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }

}
