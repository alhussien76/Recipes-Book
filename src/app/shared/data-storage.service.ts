import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map , tap } from 'rxjs/Operators'

import { RecipeService } from '../recipes/recipes.services';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipe.actions'
import * as fromApp from '../store/app.reducer'



@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
   
  constructor(private http:HttpClient, 
    private recpeService :RecipeService,
    private store :Store<fromApp.AppState>
     ) { }

  
}
