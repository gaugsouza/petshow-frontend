import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { APP_LANG, USER_TOKEN } from 'src/app/util/constantes';
import { LoginService } from 'src/app/servicos/login.service';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Prestador } from 'src/app/interfaces/prestador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Petshow';

  public mode: string = '';

  public opened: boolean = true;

  public isLogged: boolean = true;

  public isPortugues:boolean = true;

  public redirectTo:string = '';

  public nome:string;

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService,
              private router:Router,
              private loginService:LoginService,
              private dataSharingService: DataSharingService,
              private location: Location,
              private usuarioService:UsuarioService,
              private prestadorService:PrestadorService) {
    this.configuraLinguagem();
    this.localStorageService.getItem(USER_TOKEN)
      .subscribe((token) => {
        this.dataSharingService.isUsuarioLogado.next(!!(token));
        this.dataSharingService.isUsuarioLogado.subscribe((isLogado) => {
          this.isLogged = isLogado;
        });

        this.usuarioService.getUsuario(token as string).subscribe((cliente:Usuario) => {
          this.prestadorService.getPrestador(token as string).subscribe((prestador:Prestador) => {
            const { nome } = (cliente || prestador);
            this.nome = nome;
          });
        });
      });
  }

  configuraLinguagem() {
    this.localStorageService.getItem(APP_LANG).subscribe((lang:string) => {
      if (!lang) {
        this.localStorageService.setItem(APP_LANG, navigator.language && navigator.language.toUpperCase() !== 'PT-BR' ? 'en' : 'pt').subscribe(() => {
          this.defineLangSettings(this.translate);
        });
      }
    },
    () => {},
    () => this.defineLangSettings(this.translate));
  }

  defineLangSettings(translate:TranslateService):void {
    translate.addLangs(['pt', 'en']);
    this.localStorageService.getItem(APP_LANG).subscribe((lang:string) => {
      this.isPortugues = lang === 'pt';
      translate.setDefaultLang('pt');
      translate.use(lang);
    });
  }

  ngOnInit() {
    if (environment.production) {
      if (window.location.protocol === 'http:') {
        window.location.href = window.location.href.replace('http', 'https');
      }
    }
    this.localStorageService.getItem(USER_TOKEN)
      .subscribe((token) => {
        if (!token) {
          this.isLogged = false;
        }
      });
    this.updateMenu(window.innerWidth);
    this.redirectTo = !this.location.path() || ['/login', '/cadastro'].includes(this.location.path()) ? '' : `?redirectTo=${this.location.path()}`;
  }

  updateMenu(innerWidth: number):void {
    this.mode = innerWidth > 768 ? 'side' : 'over';
    this.opened = innerWidth > 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMenu(window.innerWidth);
  }

  langPt():void {
    this.localStorageService.setItem(APP_LANG, 'pt').subscribe(() => {
      this.translate.use('pt');
    });
  }

  langEn():void {
    this.localStorageService.setItem(APP_LANG, 'en').subscribe(() => {
      this.translate.use('en');
    });
  }

  changeLang():void {
    this.isPortugues = !this.isPortugues;
    if (this.isPortugues) {
      this.langPt();
    } else {
      this.langEn();
    }
  }

  deslogar() {
    this.localStorageService.removeItem(USER_TOKEN).subscribe(() => {
      this.router.navigate(['/']);
      this.loginService.isLogado = false;
      this.isLogged = this.loginService.isLogado;
    });
  }
}
