import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as AppStore from '../app/store/app.reducer'
import * as authActions from '../app/authentication/store/auth.actions'
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store:Store<AppStore.AppState>,
    @Inject(PLATFORM_ID) private platformId){}
 ngOnInit() {
   if(isPlatformBrowser(this.platformId))
   this.store.dispatch(new authActions.AutoLogin())
  
   //this.authService.autoLogin()
 }
}
