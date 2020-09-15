import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './servicos/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'petshow-frontend';

  public mode: string  = "";
  public opened: boolean = true;
  public isLogged:boolean = false;
  public isPortugues:boolean = true;

  constructor(private translate: TranslateService,
              private localStorageService: LocalStorageService) {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    this.localStorageService.getItem('usuario')
    .subscribe(usuario => {
      this.isLogged = !!(usuario);
    });
  }

  ngOnInit() {
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
