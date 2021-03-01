import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
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

  @Input('numero-control') numeroFormControl:FormControl;

  @Input('cep-control') cepFormControl:FormControl;

  erroBuscaCep:string;

  constructor(private cepService:CepService) { }

  ngOnInit = (): void => {
  }

  buscarCep() {
    this.cepService.buscaCep(this.endereco.cep).subscribe((busca) => {
      this.erroBuscaCep = '';
      const endereco = JSON.parse(busca);
      if (endereco.erro) {
        this.erroBuscaCep = 'ERRO_BUSCA_CEP';
        this.cepFormControl.setErrors({
          erroBusca: true,
        });
        return;
      }
      const {
        bairro, localidade: cidade, uf: estado, logradouro,
      } = (endereco || {});

      this.endereco = {
        ...this.endereco, bairro, cidade, estado, logradouro,
      };
      this.alteraEndereco.emit(this.endereco);
    });
  }

  alteraCampo(campo:string, valor:string) {
    this.endereco = { ...this.endereco, [campo]: valor };
    this.alteraEndereco.emit(this.endereco);
  }
}
