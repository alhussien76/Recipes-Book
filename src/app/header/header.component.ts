
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/Operators";
import { DataStorageService } from "../shared/data-storage.service";
import * as AppStore from '../store/app.reducer'
import * as authActions from '../authentication/store/auth.actions'
import * as fromRecipes from '../recipes/store/recipe.actions'

@Component({
  selector : "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit,OnDestroy{
  constructor(private dataStorage :DataStorageService, 
    private store : Store<AppStore.AppState>){}
 isAuthanticated = false
 userSub! : Subscription
 recipesub!:Subscription
  ngOnInit() {
    this.userSub=this.store.select('auth').pipe(
      map(appState =>{
        return appState.user
      })
    ).subscribe(user =>{
      this.isAuthanticated= !!user 
    })
  }
  ngOnDestroy(){
   
  this.userSub.unsubscribe()
  
  }
  saveData(){
  this.store.dispatch(new fromRecipes.StoreRecipe())
  }
  fetchData(){
    this.store.dispatch(new fromRecipes.FetchRecipes())
  }
  Logout(){
    this.store.dispatch(new authActions.Logout())
   
  }
}
