import { Injectable } from '@angular/core';
import { Pet } from '../shared/models/Pet';
import { Category } from '../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { PETS_BY_CATEGORY_URL, PETS_BY_ID_URL, PETS_BY_SEARCH_URL, PETS_CATEGORIES_URL, PETS_URL, PET_DELETE_URL, PET_UPDATE_URL, PET_UPLOAD_URL } from '../shared/constants/urls';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  //private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

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

  uploadPet(formData: FormData): Observable<{ pet: Pet; image: string }> {
    return this.http.post<{ pet: Pet; image: string }>(PET_UPLOAD_URL, formData).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error uploading pet:', error);
        throw error;
      })
    );
  };

  deletePet(petId: string): Observable<any> {
    const url = PET_DELETE_URL(petId); 
    return this.http.delete<any>(url).pipe(
      tap({
        next: () => console.log(`Pet with ID ${petId} successfully deleted.`),
        error: error => console.error('Error deleting pet:', error)
      })
    );
  };

  updatePet(petId: string, updatedPet: Pet): Observable<Pet> {
    const url = PET_UPDATE_URL(petId);
    return this.http.put<Pet>(url, updatedPet).pipe(
      tap({
        next: (response) => console.log(`Pet with ID ${petId} successfully updated.`),
        error: error => console.error('Error updating pet:', error)
      }),
      catchError((error) => {
        console.error('Error updating pet:', error);
        return throwError(error);
      })
    );
  };
};
