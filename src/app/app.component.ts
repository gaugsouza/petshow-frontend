import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { MyLoggerMonitor } from './logger-monitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private logger: NGXLogger) {
    this.logger.registerMonitor(new MyLoggerMonitor());
    this.logger.debug("Teste");
  }
  title = 'petshow-frontend';
}
