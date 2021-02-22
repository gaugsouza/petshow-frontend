import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { AngularValidateBrLibModule } from 'angular-validate-br';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: true,
      httpResponseType: 'json',
      timestampFormat: 'shortDate',
      serverLoggingUrl: '/server/logger',
    }),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'pt',
    }),
    AngularValidateBrLibModule,
  ],
  exports: [
    TranslateModule,
    NgxMaskModule,
    LoggerModule,
    AngularValidateBrLibModule,
  ],
})

export class ConfigModule {
}
