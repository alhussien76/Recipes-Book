import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {Ingredient} from '../shared/ingredient.model'
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions'

import * as appReducer from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients!  : Observable<{ingredients:Ingredient[]}>;

  constructor(
    private store : Store<appReducer.AppState>
    ) { }


  ngOnInit(): void { 
   this.ingredients=this.store.select('shoppingList')
  }
  onclickitem(id:number){
   
  
    this.store.dispatch(new ShoppingListActions.StartEditing(id))
  }
  ngOnDestroy(){

  }
 

}
