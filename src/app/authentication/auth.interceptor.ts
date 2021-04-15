import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/Operators";

import * as AppStore from '../store/app.reducer'
import { Store } from "@ngrx/store";
@Injectable({providedIn:'root'})
export class authInterceptor implements HttpInterceptor {

    constructor(private store:Store<AppStore.AppState>){}
    intercept(req : HttpRequest<any> , next : HttpHandler){
       
        return this.store.select('auth').pipe(take(1) , 
        map(appState =>{
            return appState.user
        }),
        exhaustMap(user=>{
            if(!user)
          return next.handle(req)
          const  editedReq = req.clone({params:new HttpParams().set('auth',user!.token!)})
          return next.handle(editedReq)

        }))
    
    }

}