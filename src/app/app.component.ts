import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { APP_LANG, USER_TOKEN } from 'src/app/util/constantes';
import { LoginService } from 'src/app/servicos/login.service';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';
import { Location } from '@angular/common';

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

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService,
              private router:Router,
              private loginService:LoginService,
              private dataSharingService: DataSharingService,
              private location: Location) {
    this.configuraLinguagem();
    this.localStorageService.getItem(USER_TOKEN)
      .subscribe((token) => {
        this.dataSharingService.isUsuarioLogado.next(!!(token));
        this.dataSharingService.isUsuarioLogado.subscribe((isLogado) => {
          this.isLogged = isLogado;
        });
      });
  }

  configuraLinguagem() {
    this.localStorageService.getItem(APP_LANG).subscribe((lang:string) => {
      if(!lang) {
        this.localStorageService.setItem(APP_LANG, navigator.language && navigator.language.toUpperCase() !== 'PT-BR' ? 'en' : 'pt').subscribe(() => {
          this.defineLangSettings(this.translate);
        });
      }
    },
    ()=>{},
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
