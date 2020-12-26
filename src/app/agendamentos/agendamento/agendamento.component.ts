import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  idServico: number;
  idPrestador: number;
  idCliente: number;
  servicoDetalhado: ServicoDetalhado;
  cliente: Cliente;
  isLogado: boolean = false;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private localStorageService:LocalStorageService,
    private avaliacaoService:AvaliacaoService,
    private prestadorService:PrestadorService,
    private usuarioService: UsuarioService,
    private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      this.idServico = parseInt(params.servicoDetalhado, 10);
      this.idPrestador = parseInt(params.prestador, 10);
      
      if (Number.isNaN(this.idServico)) {
        this.router.navigate(['/']);
        return;
      }
      this.preencheServico(this.idServico, this.idPrestador);
    });
    
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        return;
      }

      this.idCliente = this.jwtHelper.recuperaIdToken(token);

      this.usuarioService.buscarUsuario(this.idCliente).subscribe((cliente) => {
        this.cliente = JSON.parse(cliente);
      })});
  }

  preencheServico(idPrestador:any, idServico:any) {
    this.avaliacaoService.buscaServicoAvaliadoPorId(idPrestador, idServico).subscribe((servico) => {
      const servicoDetalhado = JSON.parse(servico);
      this.prestadorService.buscaPrestador(servicoDetalhado.prestador.id).subscribe((prestador) => {
        servicoDetalhado.prestador = JSON.parse(prestador);
        this.servicoDetalhado = servicoDetalhado;
      });
    });
  }
}
