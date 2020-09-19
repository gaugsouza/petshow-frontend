import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './servicos/local-storage.service';
import { Router } from '@angular/router';
import { LoginComponent } from './acesso/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'petshow-frontend';

  public mode: string = "";
  public opened: boolean = true;
  public isLogged: boolean = true;
  public isPortugues:boolean = true;

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService) {

    this.defineLangSettings(this.translate);
    this.localStorageService.getItem('usuario')
    .subscribe(usuario => {
      this.isLogged = !!(usuario);
    });

  }

  defineLangSettings(translate:TranslateService):void {
    translate.addLangs(['pt', 'en']);
    let defaultLang = navigator.language && navigator.language.toUpperCase() !== 'PT-BR' ? 'en' : 'pt';
    this.isPortugues = defaultLang === 'pt';
    translate.setDefaultLang('pt');
    translate.use(defaultLang);

  }
  

  ngOnInit() {
    this.localStorageService.getItem('usuario')
      .subscribe(usuario =>{
        if(!usuario){
          this.isLogged = false;
        }
      });

    let innerWidth : number = window.innerWidth;
    this.updateMenu(innerWidth);
  }

  updateMenu(innerWidth: number):void {
    this.mode = innerWidth > 768 ? "side" : "over";
    this.opened = innerWidth > 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let innerWidth : number = window.innerWidth;
    this.updateMenu(innerWidth);
  }

  langPt():void {
    this.translate.use('pt');
  }

  langEn():void {
    this.translate.use('en');
  }

  changeLang():void {
    this.isPortugues = !this.isPortugues;
    console.log(this.isPortugues);
    if(this.isPortugues) {
      this.langPt();
    } else {
      this.langEn();
    }
  }

}
