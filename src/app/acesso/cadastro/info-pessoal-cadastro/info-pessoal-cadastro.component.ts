import {
  Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-info-pessoal-cadastro',
  templateUrl: './info-pessoal-cadastro.component.html',
  styleUrls: ['./info-pessoal-cadastro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPessoalCadastroComponent implements OnInit {
  @Input('usuario') usuario:Usuario;

  @Input('confirma-senha') senhaRepetida:string;

  @Output('repete-senha') repeteSenha = new EventEmitter<string>();

  @Input('telefone-control') telefoneFormControl:FormControl;

  @Input('cpf-control') cpfFormControl:FormControl;

  @Input('nome-control') nomeFormControl:FormControl;

  @Input('email-control') emailFormControl:FormControl;

  @Input('senha-control') senhaFormControl:FormControl;

  @Input('confirma-senha-control') confirmaSenhaFormControl:FormControl;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnInit =(): void => {
  }

  confirmarSenha(senha:string) {
    this.repeteSenha.emit(senha);
  }

  senhaPossuiErros():boolean {
    return this.senhaFormControl.hasError('required') || this.senhaFormControl.hasError('min');
  }
}
