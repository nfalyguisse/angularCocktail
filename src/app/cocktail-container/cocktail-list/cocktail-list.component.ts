import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cocktail } from '../../shared/interfaces/cocktail.interface';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
})
export class CocktailListComponent implements OnInit {
  @Input() public cocktails!: Cocktail[];


  constructor() {}

  ngOnInit(): void {
    
  }

  selectCocktail(index: number) {
    console.log(index);
  }
}
