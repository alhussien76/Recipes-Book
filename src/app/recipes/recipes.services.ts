import {  Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import  *  as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import { Recipe } from "./recipe.model";
import * as appReducer from '../store/app.reducer'

@Injectable({providedIn:'root'})
export class RecipeService {
    private recipes : Recipe[] =[]
        constructor(
         private store:Store<appReducer.AppState>){}

        rsolvercount = new BehaviorSubject(0)
    


}