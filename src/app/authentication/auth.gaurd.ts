import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as appReducer from '../store/app.reducer'
import { map } from "rxjs/Operators";
@Injectable({providedIn:'root'})
export class authGuard implements CanActivate {
    constructor(
        private router : Router,
        private store :Store<appReducer.AppState>){}
    
    
    canActivate( route:ActivatedRouteSnapshot , state:RouterStateSnapshot 
        ): Observable<boolean> | Promise<boolean> | boolean {
          return this.store.select('auth').pipe(map(authData=>{
              
              if(authData.user && authData.user.token)
              return true
              else{
                this.router.navigate(['/auth'])
                    return false
              }
          }))
        }


}