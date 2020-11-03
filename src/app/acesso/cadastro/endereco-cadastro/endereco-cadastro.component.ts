import { Component, OnInit, Input } from '@angular/core';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { enderecoFormControl } from 'src/app/util/form-controls';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss']
})
export class EnderecoCadastroComponent implements OnInit {
  @Input('endereco') endereco:Endereco;

  estados:Estado[];
  cidades:Cidade[];

  @Input('logradouro-control') logradouroFormControl;
  @Input('numero-control') numeroFormControl;
  @Input('complemento-control') complementoFormControl;
  @Input('cep-control') cepFormControl;
  @Input('bairro-control') bairroFormControl;

  constructor(private consultaEstadosService:ConsultaEstadosService) { }

  ngOnInit(): void {
    this.consultaEstadosService.getEstados().subscribe(estados => {
      this.estados = JSON.parse(estados);
    })
  }

  carregarCidades(uf:string) {
    this.consultaEstadosService.getCidades(uf).subscribe(cidades => {
      this.cidades = JSON.parse(cidades);
    })
  }

}
