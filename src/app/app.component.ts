import { Component, HostListener } from '@angular/core';
import { LocalStorageService } from './servicos/local-storage.service';
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
  constructor(private localStorageService:LocalStorageService) {}

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
}
