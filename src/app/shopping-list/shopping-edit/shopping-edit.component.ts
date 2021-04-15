import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {Ingredient} from '../../shared/ingredient.model'

import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions'

import * as appReducer from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
   @ViewChild('f') myform! :NgForm
   subscription!:Subscription
   editmode=false;
   editItemIndex!:number
   editItem!:Ingredient |null

   constructor(
     private store : Store<appReducer.AppState>) { }

  additem(){
    const datapair= new Ingredient(this.myform.value.inputName,parseFloat(this.myform.value.inputAmount) )
   if(!this.editmode){
     this.store.dispatch(new ShoppingListActions.AddIngredient(datapair))
    }
   else{
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(datapair))
   }
   this.onClear()
 
  }
  ngOnInit(): void {
  this.subscription= this.store.select('shoppingList').subscribe(stateData =>{
     if(stateData.editedIngredient !==null){
      this.editmode=true;
      this.editItemIndex=stateData.editIngredientIndex
      this.editItem=stateData.editedIngredient
      
      this.myform.form.patchValue({
              inputName:this.editItem?.name ,
              inputAmount:this.editItem?.amount
            })
     }
   })
  }
  ngOnDestroy(){
   
    this.store.dispatch(new ShoppingListActions.StopEditing())
    this.subscription.unsubscribe();

  }
  onClear(){
    this.myform.reset();
    this.editmode=false
    this.store.dispatch(new ShoppingListActions.StopEditing())
  }
  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient() )
    this.onClear();

  }


}
