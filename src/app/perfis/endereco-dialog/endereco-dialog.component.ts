import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from 'src/app/interfaces/endereco';
import { FormControl, Validators } from '@angular/forms';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';
import { CepService } from 'src/app/servicos/cep.service';
@Component({
  selector: 'app-endereco-dialog',
  templateUrl: './endereco-dialog.component.html',
  styleUrls: ['./endereco-dialog.component.scss'],
})
export class EnderecoDialogComponent implements OnInit {
  logradouroFormControl = new FormControl('', [
    Validators.required,
  ]);

  numeroFormControl = new FormControl('', [
    Validators.required,
  ]);

  cepFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  bairroFormControl = new FormControl('', [
    Validators.required,
  ]);

  cidadeFormControl = new FormControl('', [
    Validators.required,
  ]);

  estadoFormControl = new FormControl('', [
    Validators.required,
  ]);

  estados: Estado[];

  cidades: Cidade[];

  erroBuscaCep:string;

  constructor(public dialogRef:MatDialogRef<EnderecoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Endereco,
              private consultaEstadoService:ConsultaEstadosService,
              private cepService:CepService) { }

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe((el) => {
      this.estados = JSON.parse(el);
    });
    this.carregarCidades(this.data.estado);
  }

  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe((el) => {
      this.cidades = JSON.parse(el);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasErrors() {
    return this.numeroFormControl.invalid
    || this.cepFormControl.invalid;
  }

  buscarCep() {
    this.cepService.buscaCep(this.data.cep).subscribe(busca => {
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

      this.data = { ...this.data, bairro, cidade, estado, logradouro };
    });
  }
}
