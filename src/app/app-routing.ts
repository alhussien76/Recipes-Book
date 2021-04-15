import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes :Routes= [
   {path:'',redirectTo:'/auth',pathMatch:'full'},
   {path:'auth',
   loadChildren: ()=> import('./authentication/auth.module').then(mod => mod.AuthMoudle)},
   {path :'recipes' ,
    loadChildren:()=> import('./recipes/recipes.module').then(mod => mod.RecipeModule)},
    {path : 'shopping-list',
    loadChildren:()=> import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule )}
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
    ],
    exports: [RouterModule]
 
})
export class AppRoutingModule {

}