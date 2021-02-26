import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import { FormControl, Validators } from '@angular/forms';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';

@Component({
  selector: 'app-servico-preco-dialog',
  templateUrl: './servico-preco-dialog.component.html',
  styleUrls: ['./servico-preco-dialog.component.scss'],
})
export class ServicoPrecoDialogComponent implements OnInit {
  tipoAnimalFormControl = new FormControl('', [
    Validators.required,
  ]);

  porteFormControl = new FormControl('', [
    Validators.required,
  ]);

  pelagemFormControl = new FormControl('', [
    Validators.required,
  ]);

  precoFormControl = new FormControl('', [
    Validators.required,
  ]);

  tiposDisponiveis: TipoAnimal[] = [];

  tipos: TipoAnimal[];

  tiposString: String[];

  tipoSelecionado: String;

  portesTipo: {
    tipoAnimal: string,
    portes: string[]
  } =
  {
    tipoAnimal: '',
    portes: [],
  }

  porteSelecionado: String;

  pelagensString: String[] = [];

  pelagemSelecionada: String;

  isPortePelagemVisible: boolean = false;

  preco: number = 0;

  constructor(public dialogRef: MatDialogRef<ServicoPrecoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (this.data.precoPorTipo) {
      const { tipoAnimal } = this.data.precoPorTipo;
      this.tipoSelecionado = tipoAnimal.nome;
      this.tiposString = [this.tipoSelecionado];

      this.isPortePelagemVisible = tipoAnimal.porte && tipoAnimal.pelagem;
      this.porteSelecionado = tipoAnimal.porte;
      this.portesTipo.portes = [tipoAnimal.porte];
      this.pelagemSelecionada = tipoAnimal.pelagem;
      this.pelagensString = [tipoAnimal.pelagem];

      this.preco = this.data.precoPorTipo.preco;

      this.getTipos();
    } else {
      this.getTiposDisponiveis();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasErrors() {
    return this.tipoAnimalFormControl.hasError('required') || this.precoFormControl.hasError('required')
      || (this.isPortePelagemVisible && (this.porteFormControl.hasError('required') || this.pelagemFormControl.hasError('required')));
  }

  getTiposDisponiveis() {
    this.usuarioService.buscarTiposAnimalEstimacao().subscribe((tiposString) => {
      const tipos: TipoAnimal[] = JSON.parse(tiposString);
      tipos.forEach((tipo) => {
        if (!this.verificaTipoAnimalRegistrado(tipo, this.data.servico.precoPorTipo)) {
          this.tiposDisponiveis.push(tipo);
        }
      });

      this.tiposString = Array.from(new Set(this.tiposDisponiveis.map((tipo) => tipo.nome)));
    });
  }

  getTipos() {
    this.usuarioService.buscarTiposAnimalEstimacao().subscribe((tiposString) => {
      this.tipos = JSON.parse(tiposString);
    });
  }

  verificaTipoAnimalRegistrado = (tipo, precosPortipoRegistrados) => {
    let isRegistrado = false;
    precosPortipoRegistrados.forEach((precoPorTipo) => {
      if (tipo.id === precoPorTipo.tipoAnimal.id) {
        isRegistrado = true;
      }
    });

    return isRegistrado;
  }

  carregarPorte(tipoAnimal) {
    this.porteSelecionado = undefined;
    this.pelagemSelecionada = undefined;
    this.pelagensString = [];

    const tiposFiltrado = this.tiposDisponiveis.filter((tipo) => tipo.nome === tipoAnimal);
    const portes = Array.from(new Set(tiposFiltrado.map((tipo) => tipo.porte)));

    this.isPortePelagemVisible = portes.indexOf(null) < 0;

    this.portesTipo = {
      tipoAnimal,
      portes,
    };
  }

  carregarPelagem(porte) {
    this.pelagemSelecionada = undefined;
    const tiposFiltrado = this.tiposDisponiveis.filter((tipo) => tipo.porte === porte
      && tipo.nome === this.portesTipo.tipoAnimal);

    this.pelagensString = Array.from(new Set(tiposFiltrado.map((tipo) => tipo.pelagem)));
  }

  constroiPrecoPorTipo() {
    const tipos = this.data.precoPorTipo ? this.tipos : this.tiposDisponiveis;

    const tipoAnimal:TipoAnimal = tipos.find((tipo) => tipo.nome === this.tipoSelecionado
      && (this.isPortePelagemVisible
        ? (tipo.pelagem === this.pelagemSelecionada
          && tipo.porte === this.porteSelecionado) : true));

    const precoPorTipo: ServicoDetalhadoTipoAnimal = {
      tipoAnimal,
      preco: this.preco,
    };

    return precoPorTipo;
  }
}
