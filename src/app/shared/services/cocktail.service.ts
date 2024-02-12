import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';

@Injectable({
  providedIn: 'root',
})
/* C'est ici que la data est manipuler, et tout sera récupérer par les composants */
export class CocktailService {
  public cocktails$: BehaviorSubject<Cocktail[]> = new BehaviorSubject([
    {
      name: 'Mojito',
      img: 'https://www.cocktailmag.fr/media/k2/items/cache/063ee9aeb9f60efa02823e51450f82ce_M.jpg',
      description:
        "Le cocktail Mojito est l'un des cocktails les plus connus, et c'est aussi l'un des plus anciens. On attribue l'invention du Mojito à Francis Drake, plus connu sous le nom 'El Draque' (le dragon).",
      ingredients: [{ name: 'citron verts', quantity: 5 }],
    },
    {
      name: 'Tequila sunrise',
      img: 'https://www.cocktailmag.fr/media/k2/items/cache/2fa67f482133f1c934235b73c2a03954_M.jpg',
      description:
        "La Tequila sunrise est un cocktail classique composé de tequila, jus d'orange et sirop de grenadine, il fait partie des cocktails les plus connus et appréciés. ",
      ingredients: [{ name: 'Orange', quantity: 2 }],
    },
    {
      name: 'Cosmopolitan',
      img: 'https://www.cocktailmag.fr/media/k2/items/cache/d3b3799d6611d677944f5f86a500beb3_M.jpg',
      description:
        'The tangy concoction of vodka, triple sec, lime juice and cranberry juice has managed to leapfrog the venerable screwdriver as many vodka drinkers prefer the Cosmopolitan’s cleaner and slightly tart taste. The keys to the preparation of a Cosmopolitan are a good brand of cranberry juice and Cointreau Triple Sec, two essential elements to the drink.',
      ingredients: [{ name: 'Vodka', quantity: 1 }],
    },
    {
      name: 'Mai Tai',
      img: 'https://www.cocktailmag.fr/media/k2/items/cache/0e09527b0f5edaa60cf5702119e6a0a2_M.jpg',
      description:
        'The Mai Tai is a Polynesian-style cocktail that has a fruity tropical taste sweet and vibrant. The mixture of light and dark rum, orange curacao, orgeat syrup and lime juice has been a symbol of Tahitian culture ever since the drink was first created.',
      ingredients: [{ name: 'Fruits Tropical', quantity: 2 }],
    },
  ]);

  constructor() {
    console.log(this.cocktails$.value);
  }

  public getCocktail(index: number) {
    const cocktails = this.cocktails$.value;
    return cocktails[index];
  }

  public addCocktail(cocktail: Cocktail): void {
    const value = this.cocktails$.value;
    /* on utilise le spread operator pour récupéré la liste de cocktail de base puis on lui ajoute le nouveau cocktail */
    this.cocktails$.next([...value, cocktail]);
  }

  public editCocktail(editedCocktail: Cocktail) {
    const value = this.cocktails$.value;
    this.cocktails$.next(value.map((cocktail: Cocktail) => { /* on parcour la liste de cocktails$ et on recherche un cocktail.nam === un coktail.name de cocktails$ */
        if ((editedCocktail.name === cocktail.name)) {
          return editedCocktail;
        } else {
          return cocktail;
        }
      })
    );
  }
}
