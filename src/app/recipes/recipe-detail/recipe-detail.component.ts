import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer'
import * as fromRecipes from '../store/recipe.actions'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/Operators';
import { Subscription } from 'rxjs';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit,OnDestroy {
 itemtoshow!: Recipe;
 recipesArr!:Recipe[]
  recipeid=0
  private subscription!:Subscription

  constructor(
    private route :ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>) {
    
   }
 

  ngOnInit(): void {
    
    this.subscription=this.route.params.pipe(
      map(params =>{
        return +params['id']
      }),switchMap(id=>{
        this.recipeid=id
        return  this.store.select('recipes')
      }),  map(resData=>{
       
        return resData.recipes
      })
    ).subscribe(
      recipes =>{
        this.recipesArr=recipes
        this.itemtoshow=recipes[this.recipeid]
      }
    );

  }
  
  Toshoppinglist(){
    this.store.dispatch(new fromShoppingList.AddIngredients(this.itemtoshow.ingredients))
  }
  onDelete(){
    if(this.recipesArr.length==1){
     const conf = confirm('This is The Last Recipe Are You Sure To Delte ?')
     if(conf===true)
     {
       this.store.dispatch(new fromRecipes.DeleteRecipe(this.recipeid))
     }
    }
    if(this.recipesArr.length>1){
      this.store.dispatch(new fromRecipes.DeleteRecipe(this.recipeid))
    }
    this.router.navigate(['/recipes'])
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
   }

}
