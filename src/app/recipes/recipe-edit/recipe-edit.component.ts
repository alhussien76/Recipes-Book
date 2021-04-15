import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as fromRecipe from '../store/recipe.actions'
import { map } from 'rxjs/Operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id=0
  editmode=false
  myform !:FormGroup
  private recipsub!:Subscription
  constructor(private route :ActivatedRoute, 
    private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params:Params) =>{
        this.id=+params['id'];
        this.editmode= params['id'] != null
        this.forminit() 
      })}

  private forminit(){
    let recipeName=''
    let recipeImage=''
    let recipeDescription=''
    let ingredients = new FormArray([])

    if(this.editmode){
     this.recipsub= this.store.select('recipes').pipe(
        map(resData=>resData.recipes)
      ).subscribe(recipes=>{
       const recipe=recipes[this.id]
       recipeName=recipe.name;
       recipeImage=recipe.imagePath;
       recipeDescription=recipe.description
       if(recipe.ingredients){
         for (let ingredient of recipe.ingredients){
           ingredients.push(
             new FormGroup({
               'name': new FormControl(ingredient.name,Validators.required),
               'amount': new FormControl(ingredient.amount,Validators.required)
             })
           )
         }
       }
      })
    }
    this.myform=new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'imagePath' : new FormControl(recipeImage,Validators.required),
      'ingredients': ingredients
    })

  }
  onsubmit(){
  if(this.editmode){
    this.store.dispatch(new fromRecipe.UpdateRecipe({
      id:this.id,
      recipe:this.myform.value,
    }))
  }
  else{
    this.store.dispatch(new fromRecipe.AddRecipe(this.myform.value))
  }
  this.router.navigate(['/recipes'])
  }
  get controls(){
    return (this.myform.get('ingredients') as FormArray) .controls
  }

  AddIngredient(){
   (this.myform.get('ingredients') as FormArray ).push(
     new  FormGroup({
       'name': new FormControl(null,Validators.required),
       'amount': new FormControl(null,Validators.required)
     })
   )
  }
  onDelete(index:number){
    (this.myform.get('ingredients') as FormArray).removeAt(index)
  }
  ngOnDestroy(): void {
    if(this.recipsub)
    this.recipsub.unsubscribe();
  }
}
