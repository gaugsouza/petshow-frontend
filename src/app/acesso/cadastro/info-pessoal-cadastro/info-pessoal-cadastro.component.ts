import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormControl, Validators } from '@angular/forms';
import {telefoneFormControl, cpfFormControl, nomeFormControl, emailFormControl, senhaFormControl} from '../../../util/form-controls';
@Component({
  selector: 'app-info-pessoal-cadastro',
  templateUrl: './info-pessoal-cadastro.component.html',
  styleUrls: ['./info-pessoal-cadastro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPessoalCadastroComponent implements OnInit {
  @Input('usuario') usuario:Usuario;
  @Input('confirma-senha') senhaRepetida:string;
  @Output('repete-senha') repeteSenha = new EventEmitter<string>();

  @Input('telefone-control') telefoneFormControl;
  @Input('cpf-control') cpfFormControl;
  @Input('nome-control') nomeFormControl;
  @Input('email-control') emailFormControl;
  @Input('senha-control') senhaFormControl;
  @Input('confirma-senha-control') confirmaSenhaFormControl;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
  }

  confirmarSenha(senha:string) {
    this.repeteSenha.emit(senha);
  }

  senhaPossuiErros():boolean {
    return this.senhaFormControl.hasError('required') || this.senhaFormControl.hasError('min');
  }

}
