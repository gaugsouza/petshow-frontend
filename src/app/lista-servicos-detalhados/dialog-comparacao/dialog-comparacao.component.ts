import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import { ComparacaoWrapper } from 'src/app/interfaces/comparacao-wrapper';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-dialog-comparacao',
  templateUrl: './dialog-comparacao.component.html',
  styleUrls: ['./dialog-comparacao.component.scss']
})
export class DialogComparacaoComponent implements OnInit {
  animais:TipoAnimal[]
  displayedColumns:string[] =  ["nome", "servico1", "servico2"]
  dataSource:any;

  constructor(public dialogRef:MatDialogRef<DialogComparacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComparacaoWrapper,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.buscarTiposAnimalEstimacao().subscribe(tipos => {
      this.animais = JSON.parse(tipos);
      this.geraDataSource();
      console.log(this.dataSource);
    }, 
    () => this.animais = [])
  }

  onNoClick():void {
    this.dialogRef.close();
  }

  getNomesTiposAnimais() {
    return [...new Set(this.animais.map(el => el.nome))]
  }

  geraDataSource() {
    const nomesCampos = {
      nome: "Nome",
      menorPreco: "Preço",
      mediaAvaliacao: "Média de avaliação",
    }
    this.dataSource = Object.keys(nomesCampos)
    .map(el => {
      return {
        nome: nomesCampos[el],
        ...this.data.servicosComparados.reduce((acc, servico, index) => ({...acc, [`servico${index+1}`]:{valor: servico[el], melhor: this.data.comparacoes[el] === servico.id || false} || {}}), {}),
        chave: el,
      }
    });

    const campos = this.getNomesTiposAnimais().map(tipo => {
      return {
        nome: `Aceita ${tipo}?`,
        ...this.data.servicosComparados.reduce((acc, servico, index) => ({...acc, [`servico${index+1}`]:servico.tiposAtendidos[tipo] ? 'check': 'close'}), {}),
        chave: "tipoAnimal"
      }
    })

    this.dataSource = [...this.dataSource, ...campos];
    
  }

}
