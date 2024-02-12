import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PanierService } from '../shared/services/ingredient.service';
import { Ingredient } from '../shared/interfaces/ingredient.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier-container',
  templateUrl: './panier-container.component.html',
  styleUrl: './panier-container.component.scss',
})
export class PanierContainerComponent implements OnInit, OnChanges {
  public ingredients?: Ingredient[];
  public subscription?: Subscription;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.subscription = this.panierService.ingredients$.subscribe(
      (ingredients: Ingredient | any) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.subscription?.unsubscribe();
  }
}
