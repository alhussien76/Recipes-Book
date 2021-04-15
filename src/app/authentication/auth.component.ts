import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {  NgForm } from "@angular/forms";
import {  Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import {Placeholder} from "../shared/placeholder.directive"
import * as AppStore from '../store/app.reducer'
import * as authActions from '../authentication/store/auth.actions'
import { Store } from "@ngrx/store";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class authComponent implements OnDestroy ,OnInit {

    @ViewChild('myform')myform!:NgForm
    @ViewChild(Placeholder) alertHost! : Placeholder  
    loginMode = true
    isloading = false
    sub!:Subscription
    error:string|null=null
   
    constructor( 
         private CFR : ComponentFactoryResolver,
         private store :Store<AppStore.AppState>) {}

    ngOnInit() {
        this.store.select('auth').subscribe(authData =>{
            this.isloading=authData.loading
            this.error=authData.authError
            if(this.error){
            this.alert(this.error)
            }
            
        })
    }     
    onSwitchMode(){
        this.loginMode=!this.loginMode
    }
    submit(){
        const email=this.myform.value.email
        const password=this.myform.value.password
        if(this.loginMode)
        {
            this.store.dispatch(new authActions.LoginStart({
                email:email,
                password:password
            })) 
        }
        else{
            this.store.dispatch(new authActions.SignupStart({
                email:email,
                password:password
            }))     
        }
        this.myform.reset()
    }
    alert(message :string){

        const ComponentFactory =this.CFR.resolveComponentFactory(AlertComponent)
        this.alertHost.viewContainerRef.clear()
        const component=this.alertHost.viewContainerRef.createComponent(ComponentFactory)
        component.instance.message=message;
        this.sub=component.instance.close.subscribe(()=>{
            this.alertHost.viewContainerRef.clear()
            this.sub.unsubscribe();
       } )
    }
    ngOnDestroy()
    {
        if(this.sub)
        this.sub.unsubscribe();
    }
}