import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // anchorScrolling: Links wie "/#skills" scrollen zur Section
      // scrollPositionRestoration: neue Seite (z. B. Impressum) startet oben
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // 'reload': auch ein zweiter Klick auf denselben Link scrollt erneut
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideHttpClient(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
  ]
};