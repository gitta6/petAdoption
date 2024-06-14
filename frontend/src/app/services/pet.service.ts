import { Injectable } from '@angular/core';
import { Pet } from '../shared/models/Pet';
import { Category } from '../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PETS_BY_CATEGORY_URL, PETS_BY_ID_URL, PETS_BY_SEARCH_URL, PETS_CATEGORIES_URL, PETS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(PETS_URL);
  };

  getAllPetsBySearchTerm(searchTerm: string) {
    return this.http.get<Pet[]>(PETS_BY_SEARCH_URL + searchTerm);
  };

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(PETS_CATEGORIES_URL);
  };

  getAllPetsByCategory(category: string): Observable<Pet[]> {
    return category == "All" ? this.getAll() : this.http.get<Pet[]>(PETS_BY_CATEGORY_URL + category);
  };

  getPetById(petID: string): Observable<Pet> {
    return this.http.get<Pet>(PETS_BY_ID_URL + petID)
  };
}
