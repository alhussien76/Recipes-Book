import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../authentication/auth.gaurd";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolver } from "./recipes.resolver.service";

const routes: Routes= [
    {path:'', component:RecipesComponent,
    canActivate:[authGuard]
    ,children:[
        {path:'',component:RecipeStartComponent,resolve:[RecipeResolver]},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:RecipeDetailComponent,resolve:[RecipeResolver] },
        {path:':id/edit', component:RecipeEditComponent },
    ]},
]

@NgModule({

    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
 
})
export class RecipesRouting {

}