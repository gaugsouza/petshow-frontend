import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '../../../node_modules/@angular/forms';
import { PrestadorService } from '../servicos/prestador.service';
// import { Prestador } from '../interfaces/prestador';
import { TipoAnimal } from '../enum/TipoAnimal';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Prestador } from './Prestador';
import { Endereco } from '../interfaces/endereco';
import { Validacoes } from '../validacoes';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss']
})
export class PerfilPrestadorComponent implements OnInit {

formularioDePrestador: FormGroup; // Aqui damos um nome para nosso formulário do tipo FormGroup

// prestador:Prestador;
prestador: Prestador = new Prestador();

erroRequisicao:String;
submitted = false;


constructor(private fb: FormBuilder, // Via DI, nós obtemos o FormBuilder.
            private prestadorService:PrestadorService,
            private router:Router,
            private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.criarformularioDePrestador();
  }

  criarPrestador(prestador:Prestador) {
    this.prestadorService.criaPrestador(prestador)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/prestador', id]);
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }

  
  newPrestador(): void {
    this.submitted = false;
    this.prestador = new Prestador();
  }

  salvarPrestador() {
    this.prestadorService
    .criaPrestador(this.prestador).subscribe(data => {
      console.log(data)
      this.prestador = new Prestador();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() { // enviar o novo prestador - comando de confirmação
    this.submitted = true;
    this.salvarPrestador();    
  }

  gotoList() { // define a rota
    this.router.navigate(['/prestador']);
  }





  enviarDados() { // Criado para uso do FormBuilder
    const dadosFormulario = this.formularioDePrestador.value;

    const usuario = new Prestador(
        { id: dadosFormulario.id, nome: dadosFormulario.nome, nomeSocial: dadosFormulario.nomeSocial, foto: dadosFormulario.foto, cpf: dadosFormulario.cpf, nascimento: dadosFormulario.nascimento, tipo: dadosFormulario.tipo, login: dadosFormulario.login, email: dadosFormulario.email, senha: dadosFormulario.senha, confirmarSenha: dadosFormulario.confirmarSenha, endereco: dadosFormulario.endereco, telefone: dadosFormulario.elefone, descricao: dadosFormulario.descricao });

    alert(`O prestador ${this.prestador.nome} foi cadastrado com sucesso. \n Dados: ${JSON.stringify(this.prestador)}`);

    this.formularioDePrestador.reset();
  }

  criarformularioDePrestador() { // Criado para uso do FormBuilder
    this.formularioDePrestador = this.fb.group({
      id: [''],
      nome: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ])
      ],
      nomeSocial: [''], // VERIFICAR EXISTENCIA NO CODIGO
      foto: [''],
      cpf: ['',Validators.compose([Validators.required, Validacoes.ValidaCpf])],
      nascimento: ['', Validators.compose([Validators.required, Validacoes.MaiorQue18Anos])], // VERIFICAR EXISTENCIA NO CODIGO
      tipo: [''],
      endereco: [''],
      telefone: [''],
      descricao: [''],
      email: ['', Validators.compose([Validators.email])],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      ],
      confirmarSenha: ['', Validators.compose([Validators.required])]
    },
    {
      validator: Validacoes.SenhasCombinam
    });
  }


  // Propriedades do formulário que vamos utilizar para obter os erros
  get nome() {
    return this.formularioDePrestador.get('nome');
  }

  get email() {
    return this.formularioDePrestador.get('email');
  }

  get cpf() {
    return this.formularioDePrestador.get('cpf');
  }

  get nascimento() {
    return this.formularioDePrestador.get('nascimento');
  }

  get senha() {
    return this.formularioDePrestador.get('senha');
  }

  get confirmarSenha() {
    return this.formularioDePrestador.get('confirmarSenha');
  }
}
