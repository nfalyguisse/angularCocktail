import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CocktailService } from '../../shared/services/cocktail.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Cocktail } from '../../shared/interfaces/cocktail.interface';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrl: './cocktail-form.component.scss',
})
export class CocktailFormComponent implements OnInit {
  public cocktailForm!: FormGroup;
  public cocktail?: Cocktail;
  private defaultCocktail: Cocktail = {
    name: '',
    description: '',
    img: '',
    ingredients: [],
  };

  public get ingredients() {
    return this.cocktailForm.get('ingredients')! as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private cocktailService: CocktailService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get('index')!;
      if (index != null) {
        this.cocktail = cocktailService.getCocktail(+index);
        this.initForm(this.cocktail);
      }else{
        this.initForm()
      }
    });
  }
  ngOnInit(): void {}

  /* Si cocktail = null alors on initialise un cocktail par defaut */
  private initForm(cocktail: Cocktail = this.defaultCocktail): void {
    this.cocktailForm = this.fb.group({
      /* maintant au lieu de passer des valeurs par défaut vide [''], on passe les attribut du cocktail */
      name: [cocktail.name, Validators.required],
      img: [cocktail.img, Validators.required],
      description: [cocktail.description, Validators.required],
      ingredients: this.fb.array(
        cocktail.ingredients.map((ingredient) =>
          this.fb.group({
            /* pour tout les ingrédients de l'array on les transforme en formGroup */
            name: [ingredient.name, Validators.required],
            quantity: [ingredient.quantity],
          })
        ),
        Validators.required
      ),
    });
  }

  public addIngredient(): void {
    /* on ajoute un from group au formArray ingredients */
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: [0, Validators.required],
      })
    );
  }

  public submit(): void {
    if (this.cocktail) {
      this.cocktailService.editCocktail(this.cocktailForm.value)
    }else{
      this.cocktailService.addCocktail(this.cocktailForm.value);
    }
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
