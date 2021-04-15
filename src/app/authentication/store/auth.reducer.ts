import { User } from "../user.model";
import * as AuthActions from '../store/auth.actions'
export interface State {
    user:User|null,
    authError:string|null,
    loading:boolean
}
const initialState:State = {
    user:null ,
    authError:null,
    loading:false

}

export function authReducer(state:State=initialState , action:AuthActions.AuthActions){
    switch (action.type){
        case AuthActions.AUTH_SUCCESS:
            const user: User =new User(action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
                )
                return {
                    ...state,
                    user:user,
                    loading:false ,
                    authError:null
                }
        case AuthActions.LOGOUT:
            return{
                ...state,
                loading:false,
                user:null
            }
            case AuthActions.LOGIN_START:
            case AuthActions.SIGNUP_START:  
                return {
                ...state,
                authError:null  ,
                loading:true,
                }
            case AuthActions.AUTH_FAIL:
                return {
                     ...state,
                     user:null,
                     loading:false,
                     authError:action.payload
                }
                               
        default:
            return state
           
        
    }

}