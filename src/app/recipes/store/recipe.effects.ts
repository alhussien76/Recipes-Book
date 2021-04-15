import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap,map, withLatestFrom } from "rxjs/Operators";
import * as fromApp from '../../store/app.reducer'
import { Recipe } from "../recipe.model";
import * as fromRecipes from './recipe.actions'

@Injectable()
export class RecipesEffects {
    fetch=createEffect(
        ()=>this.action$.pipe(
            ofType(fromRecipes.FETCH_RECIPES),
            switchMap(()=>{
            return this.http.get<Recipe[]>('https://ng-test-ed505-default-rtdb.firebaseio.com/Recipes.json')
            }),map(recipes =>{
                
                if(recipes === null){
                return []    
                }
                return recipes.map(recipe =>{
                  return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                })
              }),
              map(recipes=>{
                  return new fromRecipes.SetRecipes(recipes)
              })
        )
    )
    save=createEffect(
        ()=> this.action$.pipe(
            ofType(fromRecipes.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData,recipesState])=>{  
             return this.http.put('https://ng-test-ed505-default-rtdb.firebaseio.com/Recipes.json',
             recipesState.recipes)
            }),
        ),
        {dispatch:false}
    )



    constructor(private action$ :Actions,
        private http:HttpClient ,
        private store:Store<fromApp.AppState>){}
}