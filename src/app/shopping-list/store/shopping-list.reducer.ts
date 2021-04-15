import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";
 
export interface State {
    ingredients:Ingredient[],
    editIngredientIndex:number
    editedIngredient:Ingredient | null,
}


const initialState:State ={
    ingredients:[],
    editIngredientIndex: -1,
    editedIngredient: null 

} 
 export class NoRedundant {
     
   constructor( ){  }
    addNoDupIngredient( ingredients:Ingredient[], ingred:Ingredient){
       
            let found= ingredients.findIndex(
            function (post, index) {
                    if (post.name === ingred.name)
                        return true;
                    else 
                     return false ;   
                })
            if(found >=0)
            {
               ingredients[found]={...ingredients[found],
                amount:ingredients[found].amount+ingred.amount}
                
            }
            else{
                ingredients.push(ingred);
            }
        return ingredients
  }
  addNoDupIngredients( ingredients:Ingredient[], ingreds:Ingredient[]){
    for(let ingredient of ingreds)
    {
        const found= ingredients.findIndex(
        function (post, index) {
                if (post.name === ingredient.name)
                    return true;
                else 
                  return false ;   
            })
        if(found >=0)
        {
            ingredients[found]={...ingredients[found],
            amount:ingredients[found].amount+ingredient.amount}
        }
        else{
            ingredients.push(ingredient);
        }
    }
    return ingredients
  }
}

export function shoppingListReducer(state :State =initialState ,
     action:Action ) {
         
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            {
            let copIngredients :Ingredient[] =[...state.ingredients]
            let noRedObj = new NoRedundant()
            let  newIngredients:Ingredient[] = noRedObj.addNoDupIngredient(copIngredients,action.payload)
            return {
                ...state,
                ingredients:newIngredients
            }
        }
        case ShoppingListActions.ADD_INGREDIENTS:
            let copIngredients :Ingredient[] =[...state.ingredients]
            let noRedObj = new NoRedundant()
            let  newIngredients:Ingredient[] = noRedObj.addNoDupIngredients(copIngredients,action.payload)
            return {
                ...state ,
                ingredients: [...newIngredients]
            }

        case ShoppingListActions.UPDATE_INGREDIENT :
            {
              let ingredients = state.ingredients.slice()
              ingredients[state.editIngredientIndex]=action.payload
              return{
                  ...state,
                  ingredients:ingredients
              }};

        case ShoppingListActions.DELETE_INGREDIENT :
            {
            return{
                ...state,
                ingredients:state.ingredients.filter((ing:Ingredient , index:number)=>{
                    return index !== state.editIngredientIndex 
                
                })}
        }
        case ShoppingListActions.START_EDITING :
            
            return  {
                ...state ,
                editIngredientIndex : action.payload,
                editedIngredient : state.ingredients[action.payload]
            }
        case ShoppingListActions.STOP_EDITING :
            {
                const x= { 
                    ...state ,
                    editIngredientIndex : -1 ,
                    editedIngredient : null
                }
            return x;
            }
        default:
            return state
    }
}
