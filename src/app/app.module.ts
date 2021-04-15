import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {HeaderComponent} from './header/header.component'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { authInterceptor } from './authentication/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './authentication/store/auth.effects';
import { environment } from 'src/environments/environment';
import { RecipesEffects } from './recipes/store/recipe.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent, 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects,RecipesEffects, ]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    AppRoutingModule,
    SharedModule,
    ],

  providers: [ 
    {
    provide: HTTP_INTERCEPTORS, 
    useClass :authInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
