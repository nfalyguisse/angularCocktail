import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cocktail } from '../shared/interfaces/cocktail.interface';
import { CocktailService } from '../shared/services/cocktail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail-container',
  templateUrl: './cocktail-container.component.html',
  styleUrl: './cocktail-container.component.scss',
})
export class CocktailContainerComponent implements OnInit, OnDestroy {
  public cocktails: Cocktail[] = [];
  
  // Permettras de regrouper toutes nos  souscription
  public subscription: Subscription = new Subscription();

  constructor(private cocktailService: CocktailService) {}

  ngOnInit() {
    this.subscription.add(
      this.cocktailService.cocktails$.subscribe((cocktails: Cocktail[]) => {
        this.cocktails = cocktails;
      })
    );
  }

  ngOnDestroy(): void {
    // désactive toutes les souscriptions ajouté à "this.subricption"
    this.subscription.unsubscribe();
  }
}
