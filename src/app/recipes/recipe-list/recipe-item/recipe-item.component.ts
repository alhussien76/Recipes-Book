import { Component,  Input, OnInit, ViewChild,  } from '@angular/core';

import { Recipe } from "src/app/recipes/recipe.model"


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

 @Input() recipe!: Recipe;
 @Input() recipeindex=0


 constructor() { }
 
  ngOnInit(): void {

  }

}