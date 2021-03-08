import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';
import { Empresa } from 'src/app/interfaces/empresa';
import { Endereco } from 'src/app/interfaces/endereco';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.scss'],
})
export class CadastroEmpresaComponent implements OnInit {
  @Output('altera-empresa') alterarEmpresa:EventEmitter<Empresa> = new EventEmitter();

  @Input('empresa') empresa:Empresa;

  endereco:Endereco = {}

  numeroFormControl = new FormControl('', [Validators.required]);

  cepFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  nomeFormControl= new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  nomeSocialFormControl= new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ])

  cnpjFormControl:FormControl;

  constructor(private validateBrService:ValidateBrService) {
    this.cnpjFormControl = new FormControl('', [
      Validators.required,
      this.validateBrService.cnpj,
    ]);
  }

  ngOnInit = (): void => {
  }

  alteraEmpresa(campo:string, valor:string) {
    if (campo === 'cnpj') {
      valor = valor.replace(/[\.|\-|\/]/g, '');
    }
    this.empresa = { ...this.empresa, [campo]: valor };
    this.alterarEmpresa.emit(this.empresa);
  }

  alteraEnderecoEmpresa = (endereco:Endereco) => {
    this.endereco = { ...this.endereco, ...endereco };
    this.empresa = { ...this.empresa, endereco: this.endereco };
    this.alterarEmpresa.emit(this.empresa);
  }
}
