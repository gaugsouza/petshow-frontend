import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from 'src/app/interfaces/endereco';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-endereco',
  templateUrl: './dialog-endereco.component.html',
  styleUrls: ['./dialog-endereco.component.scss']
})
export class DialogEnderecoComponent implements OnInit {
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

  constructor(public dialogRef:MatDialogRef<DialogEnderecoComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Endereco) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  hasErrors() {
    return this.logradouroFormControl.hasError('required') || this.numeroFormControl.hasError('required') || this.cepFormControl.hasError('required') || this.bairroFormControl.hasError('required') || this.cidadeFormControl.hasError('required') || this.estadoFormControl.hasError('required') ;
  }
}
