import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailContainerComponent } from './cocktail-container/cocktail-container.component';
import { PanierContainerComponent } from './panier-container/panier-container.component';
import { CocktailDetailsComponent } from './cocktail-container/cocktail-details/cocktail-details.component';
import { CocktailFormComponent } from './cocktail-container/cocktail-form/cocktail-form.component';

const routes: Routes = [
  {path:'', redirectTo:'cocktails', pathMatch:'full'},

  {path:'cocktails', component: CocktailContainerComponent, children:[
    {path:'new', component: CocktailFormComponent},
    {path:':index/edit', component: CocktailFormComponent},
    
    {path:':index', component: CocktailDetailsComponent},
    {path:'', redirectTo:'0', pathMatch:'full'},
  ]},

  {path:'panier', component: PanierContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
