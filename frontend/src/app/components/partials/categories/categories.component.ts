import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories?: Category[];
  constructor(petService:PetService) {
    this.categories = petService.getAllCategories();
  }
}
