import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {AuthInterceptor} from './interceptor/auth-interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(ReactiveFormsModule),
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
};
