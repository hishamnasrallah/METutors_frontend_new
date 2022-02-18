import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgProgressModule } from 'ngx-progressbar';
import {
  SocialLoginModule,
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

import { AuthInterceptor } from './core/intercepters';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NgProgressModule.withConfig({
      spinnerPosition: 'right',
      color: '#3bb3c1',
      direction: 'ltr+',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              //"932307944888-3624muskqs1iin0feiu1loj6pffps0pl.apps.googleusercontent.com"
              '466805394657-e2m655c5uou267lharg9qfrnj9rld5ij.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('447025460465825'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
