import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject,  throwError } from "rxjs";
import { catchError, tap } from "rxjs/Operators";
import { User } from "./user.model";
import { environment } from 'src/environments/environment'
import { Store } from "@ngrx/store";
import * as AppStore from '../store/app.reducer'
import * as fromAuth from '../authentication/store/auth.actions'

export interface authResponse {
    email : string ,
    expiresIn : string , 
    idToken : string ,
    kind :string
    localId : string ,
    refreshToken: string ,
    registered? :boolean
}

@Injectable({providedIn:'root'})
export class authService {
    expirationTime!:any
    token! : string|null;
    constructor(private http: HttpClient , 
        private router :Router ,
         private store:Store<AppStore.AppState>){}
   
    
    logout(){
       
        localStorage.clear()
        if(this.expirationTime)
        clearTimeout(this.expirationTime)
        this.expirationTime=null
    }
    autoLogin(){
        const loadedData = JSON.parse(localStorage.getItem('userData')!)
       if(!loadedData){
           return;
       }
      const loadedUser = new User(
          loadedData.email,
          loadedData.id ,
          loadedData._token,
          new Date(loadedData._tokenExpiration)
      ) 
      if(loadedUser.token){
        const  expirein= new Date(loadedData._tokenExpiration).getTime() - new Date().getTime()
        console.log(expirein)
        this.autoLogout(expirein/1000)
        this.store.dispatch(new fromAuth.AuthSuccess({
            email: loadedData.email,
            userId:loadedData.id,
            token:loadedData._token,
           expirationDate: new Date(loadedData._tokenExpiration)
        }))
      }
      if(!loadedUser.token){
        this.logout()
      }
    
    } 
    autoLogout(expiration: number){
      this.expirationTime= setTimeout(()=>{
            this.logout()
        },expiration*1000)

    }
}