import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.scss']
})
export class CadastroEmpresaComponent implements OnInit {
  @Output('altera-empresa') alterarEmpresa:EventEmitter<Empresa> = new EventEmitter();
  @Input('empresa') empresa:Empresa;

  constructor() { }

  ngOnInit(): void {
  }

  alteraEmpresa(campo:string, valor:string) {
    this.empresa = { ...this.empresa, [campo]:valor };
    this.alterarEmpresa.emit(this.empresa);
  }
}
