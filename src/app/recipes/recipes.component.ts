import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.services';



@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  slecrec!: Recipe;
 
  constructor(private recipeservice :RecipeService) {

  }

  ngOnInit(): void {
    this.recipeservice.rsolvercount.next(1)
  }

}
