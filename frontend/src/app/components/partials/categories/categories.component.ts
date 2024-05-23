import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Category';
import { PetService } from '../../../services/pet.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories?: Category[];
  constructor(petService:PetService) {
    this.categories = petService.getAllCategories();
  }
}
