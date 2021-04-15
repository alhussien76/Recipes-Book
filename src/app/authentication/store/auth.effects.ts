import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/Operators";
import * as authActions from '../store/auth.actions'
import * as AppState from '../../store/app.reducer'
import { environment } from '../../../environments/environment'
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { User } from "../user.model";
import { Store } from "@ngrx/store";

export interface authResponse {
    email : string ,
    expiresIn : string , 
    idToken : string ,
    kind :string
    localId : string ,
    refreshToken: string ,
    registered? :boolean
}

const handelAuthentication = (resData:authResponse)=>{
    const user = new User(resData.email,
        resData.localId,
        resData.idToken,
        new Date(new Date().getTime() + +resData.expiresIn * 1000))
        localStorage.setItem('userData',JSON.stringify(user) )
    return  new authActions.AuthSuccess({
        email: resData.email,
         userId: resData.localId,
         token: resData.idToken,
        expirationDate: new Date(new Date().getTime() + +resData.expiresIn * 1000)
    }) 

}

const handelError = (errorres:any)=>{
    let errormessage='Error Occuerred'
      switch (errorres.error.error.message) {
          case "EMAIL_EXISTS":
              errormessage='This Email Already Exist'
              break;
          case "INVALID_EMAIL":
              errormessage= 'This Email Is Invalid'
              break;
          case "EMAIL_NOT_FOUND":
              errormessage='This Email Is Not Found '
              break;
          case "INVALID_PASSWORD":
              errormessage= 'The password is invalid or the user does not have a password'    
              break; 
       }
 return of(new authActions.AuthFail(errormessage))
}

@Injectable()
export class AuthEffects {
    clearTimer!:any
    authLoging= createEffect(
        ()=> this.actions$.pipe(
            ofType(authActions.LOGIN_START),
            switchMap((authData:authActions.LoginStart)=>{
                return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FireBasekey,
                {
                    email: authData.payload?.email,
                    password: authData.payload?.password,
                    returnSecureToken: true
                })
                .pipe(
                    tap((resData)=>{
                        this.autoLogout(+resData.expiresIn)
                    })
                    ,map(resData => {
                      return  handelAuthentication(resData)
                       })
                    ,catchError(errorres=>{
                       return handelError(errorres)
                    })
                )
            })
        )
    );

    authSignup= createEffect(
        ()=> this.actions$.pipe(
            ofType(authActions.SIGNUP_START),
            switchMap((authData:authActions.SignupStart)=>{
                return  this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.FireBasekey,
                {   email: authData.payload?.email,
                    password: authData.payload?.password,
                    returnSecureToken: true
                })
                .pipe(
                    tap((resData)=>{
                    this.autoLogout(+resData.expiresIn)
                })
                ,map(resData => {
                    return  handelAuthentication(resData)
                    })
                ,catchError(errorres=>{
                    return handelError(errorres)
                    })
                )
            })
        )
    )
    autoLogin=createEffect(
        ()=>this.actions$.pipe(
           ofType(authActions.AUTO_LOGIN),
           map(()=>{
            const loadedData = JSON.parse(localStorage.getItem('userData')!)
            if(!loadedData){
                return{type:'sasas'}
            }
           const loadedUser = new User(
               loadedData.email,
               loadedData.id ,
               loadedData._token,
               new Date(loadedData._tokenExpiration)
           ) 
           if(loadedUser.token){
            const  expirein= new Date(loadedData._tokenExpiration).getTime() - new Date().getTime()
            this.autoLogout(expirein/1000)
           return (new authActions.AuthSuccess({
                email: loadedData.email,
                userId:loadedData.id,
                token:loadedData._token,
               expirationDate: new Date(loadedData._tokenExpiration)
            }))
          }
          if(!loadedUser.token){
           return new authActions.Logout()
          }
          return {type:'sasas'}
           })
        )
    )

    autoLogout= (expirein:number)=>{
       this.clearTimer= setTimeout(()=>{
        this.store.dispatch(new authActions.Logout())
        },expirein*1000)
    }
 
    authNavigate = createEffect(
        ()=> this.actions$.pipe(
           ofType(authActions.LOGOUT),
            tap(()=>{
                localStorage.clear()
                clearTimeout(this.clearTimer)
                this.clearTimer=null
                this.route.navigate(['/'])
            })
        ),
        { dispatch: false }

    )
    constructor(private actions$: Actions ,
         private http:HttpClient ,
         private route:Router,
         private store:Store<AppState.AppState>){}
}