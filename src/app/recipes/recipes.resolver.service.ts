import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import * as fromRecipes from '../recipes/store/recipe.actions'
import * as fromApp from '../store/app.reducer'
import { Action, Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/Operators";
import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { RecipeService } from "./recipes.services";


@Injectable({providedIn:'root'})
export class RecipeResolver implements Resolve<Recipe[]|Action> {

    constructor(private recipser :RecipeService,
        private actions$ :Actions,
         private store:Store<fromApp.AppState>,
          ){}
    resolve(route :ActivatedRouteSnapshot , state : RouterStateSnapshot){
        let count =0
        this.recipser.rsolvercount.subscribe(num=>{
            count = num
        })

       return this.store.select('recipes').pipe(
           take(1),
            map(resData=>resData.recipes),
            switchMap(recipes =>{
                if(recipes.length === 0 && count ==0  ){
                    this.store.dispatch(new fromRecipes.FetchRecipes()) 
                    return this.actions$.pipe(
                        ofType(fromRecipes.SET_RECIPES),
                        take(1)
                    );
                }
                else
                return of(recipes)
            })
            )
    }

}