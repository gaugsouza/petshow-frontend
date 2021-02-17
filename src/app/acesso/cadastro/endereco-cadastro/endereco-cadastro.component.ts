import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { FormControl } from '@angular/forms';
import { CepService } from 'src/app/servicos/cep.service';

@Component({
  selector: 'app-endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss'],
})
export class EnderecoCadastroComponent implements OnInit {
  @Output('altera-endereco') alteraEndereco:EventEmitter<Endereco> = new EventEmitter<Endereco>();

  @Input('endereco') endereco:Endereco;

  estados:Estado[];

  cidades:Cidade[];


  @Input('numero-control') numeroFormControl:FormControl;

  @Input('cep-control') cepFormControl:FormControl;


  erroBuscaCep:string;
  constructor(private consultaEstadosService:ConsultaEstadosService,
              private cepService:CepService) { }

  ngOnInit(): void {
    this.consultaEstadosService.getEstados().subscribe((estados) => {
      this.estados = JSON.parse(estados);
    });
  }

  carregarCidades(uf:string) {
    this.consultaEstadosService.getCidades(uf).subscribe((cidades) => {
      this.cidades = JSON.parse(cidades);
    });
  }

  buscarCep() {
    this.cepService.buscaCep(this.endereco.cep).subscribe(busca => {
      this.erroBuscaCep = '';
      const endereco = JSON.parse(busca);
      if(endereco.erro) {        
        this.erroBuscaCep = 'ERRO_BUSCA_CEP';
        this.cepFormControl.setErrors({
          erroBusca:true
        });
        return;
      }
      const { bairro, localidade:cidade, uf:estado, logradouro } = (endereco || {});

      this.endereco = { ...this.endereco, bairro, cidade, estado, logradouro };
      this.alteraEndereco.emit(this.endereco);
    });
  }

  alteraCampo(campo:string, valor:string) {
    this.endereco = {...this.endereco, [campo]:valor};
    this.alteraEndereco.emit(this.endereco);
  }
}
