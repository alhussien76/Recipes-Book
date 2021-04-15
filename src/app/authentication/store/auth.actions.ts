import { Action } from "@ngrx/store"

export const LOGIN_START :string='[Auth] Login Start'
export const AUTH_SUCCESS:string='[Auth] Success'
export const LOGOUT:string='[Auth] Logout'
export const AUTH_FAIL:string ='[auth]  Fail'
export const SIGNUP_START ='[Auth] Sginup Start'
export const AUTO_LOGIN = '[Auth] Auto Login' 




export class AuthSuccess implements Action {
    readonly type=AUTH_SUCCESS
    constructor(public payload?:{
        email:string,
        userId:string,
        token:string,
        expirationDate:Date
    }){}

}
export class Logout implements Action {
    readonly type=LOGOUT
    payload?:any
    
    
}
export class LoginStart implements Action {
    readonly type=LOGIN_START
    constructor(public payload?:{
        email:string,
        password:string
    }){}
}
export class AuthFail implements Action {
    readonly type=AUTH_FAIL
    constructor(public payload:string){}
}
export class SignupStart implements Action{ 
    readonly type = SIGNUP_START
    constructor(public payload?:{
        email:string,
        password:string
    }){}
}
export class AutoLogin {
    readonly type=AUTO_LOGIN
    payload?:any
}

export type AuthActions = AuthSuccess | Logout |
 LoginStart | AuthFail |SignupStart | AutoLogin 