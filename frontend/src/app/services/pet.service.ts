import { Injectable } from '@angular/core';
import { Pet } from '../shared/models/Pet';
import { sample_pets } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor() { }

  getAll():Pet[]{
    return sample_pets;
  }

  getAllPetsBySearchTerm(searchTerm:string){
    return this.getAll().filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
