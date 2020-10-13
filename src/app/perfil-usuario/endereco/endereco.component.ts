import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Endereco } from 'src/app/interfaces/endereco';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogEnderecoComponent } from './dialog-endereco/dialog-endereco.component';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  @Input('endereco') endereco:Endereco;
  @Output('atualiza-endereco') atualizaEndereco = new EventEmitter<Endereco>();
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogEnderecoComponent, {
      width: '600px',
      data: {...this.endereco}
    });

    dialogRef.afterClosed().subscribe(endereco => {
      if(endereco) {
        this.atualizaEndereco.emit(endereco);
      }
    })
  }

}
