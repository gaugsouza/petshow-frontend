import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpHeaders } from '@angular/common/http';
// import { MyLoggerMonitor } from './logger-monitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private logger: NGXLogger) {
    // this.logger.setCustomHttpHeaders(new HttpHeaders({'Content-Type': 'application/json'}))
    this.logger.error("Teste");
  }
  title = 'petshow-frontend';
}
