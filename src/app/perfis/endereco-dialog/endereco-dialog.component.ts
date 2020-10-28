import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from 'src/app/interfaces/endereco';
import { FormControl, Validators } from '@angular/forms';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';
@Component({
  selector: 'app-endereco-dialog',
  templateUrl: './endereco-dialog.component.html',
  styleUrls: ['./endereco-dialog.component.scss']
})
export class EnderecoDialogComponent implements OnInit {

  logradouroFormControl = new FormControl('', [
    Validators.required
  ]);

  numeroFormControl = new FormControl('', [
    Validators.required
  ]);

  cepFormControl = new FormControl('', [
    Validators.required
  ]);

  bairroFormControl = new FormControl('', [
    Validators.required
  ]);

  cidadeFormControl = new FormControl('', [
    Validators.required
  ]);

  estadoFormControl = new FormControl('', [
    Validators.required
  ]);

  estados: Estado[];
  cidades: Cidade[];

  constructor(public dialogRef:MatDialogRef<EnderecoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Endereco,
              private consultaEstadoService:ConsultaEstadosService) { }

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = JSON.parse(el);
    });
    this.carregarCidades(this.data.estado);
  }

  carregarCidades(uf:string) {
    console.log(uf);
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = JSON.parse(el);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  

  hasErrors() {
    return this.logradouroFormControl.hasError('required') || this.numeroFormControl.hasError('required') || this.cepFormControl.hasError('required') || this.bairroFormControl.hasError('required');
  }

}
