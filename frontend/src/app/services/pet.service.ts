import { Injectable } from '@angular/core';
import { Pet } from '../shared/models/Pet';
import { sample_categories, sample_pets } from '../../data';
import { Category } from '../shared/models/Category';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor() { }

  getAll(): Pet[] {
    return sample_pets;
  }

  getAllPetsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllCategories(): Category[] {
    return sample_categories;
  }

  getAllPetsByCategory(category: string): Pet[] {
    return category == "All" ? this.getAll() : this.getAll().filter(pet => pet.categories?.includes(category));
  }

  getPetById(petID: string): Pet {
    return this.getAll().find(pet => pet.id == petID) ?? new Pet();
  }

}
