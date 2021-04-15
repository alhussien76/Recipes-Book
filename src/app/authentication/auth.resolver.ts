import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as appReducer from '../store/app.reducer'

@Injectable({providedIn:'root'})
export class AuthResolver implements Resolve<any> {
    constructor(private router: Router,private store:Store<appReducer.AppState>){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       this.store.select('auth').subscribe(authData=>{
        if(authData.user){
            this.router.navigate(['/recipes'])
        }
       })
    }

}