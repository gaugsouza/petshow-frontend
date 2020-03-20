import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'petshow-frontend';
  constructor(){
    console.log("Teste Papertrail");
    console.warn("Teste Papertrail warn");
    console.error("Teste papertrail error");
  }
}
