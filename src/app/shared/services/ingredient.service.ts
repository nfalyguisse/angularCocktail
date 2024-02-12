import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  public ingredients$: BehaviorSubject<Ingredient[] | null> = new BehaviorSubject<Ingredient[] | null>(null);

  constructor() {}

  /* logique d'ajout au panier qui accumule les ingrédients déjà présents dans le tableau */
  public addToPanier(ingredients: Ingredient[]): void {
    const currenValue = this.ingredients$.value;
    console.log(currenValue);
    
    if (currenValue) {
      const fullArray = [...currenValue, ...ingredients];
      const obj = fullArray.reduce((acc:any, value) => {
        if (acc[value.name]) {
          acc[value.name] += value.quantity;
        } else {
          acc[value.name] = value.quantity;
        }
        return acc;
      }, {});
      const result = Object.keys(obj).map((key) => ({
        name: key,
        quantity: obj[key],
      }));
      console.log(result);

      this.ingredients$.next(result);
    } else {
      this.ingredients$.next(ingredients);
    }
  }
}
