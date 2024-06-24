import { Injectable } from '@angular/core';
import { Pet } from '../shared/models/Pet';
import { Category } from '../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { PETS_BY_CATEGORY_URL, PETS_BY_ID_URL, PETS_BY_SEARCH_URL, PETS_CATEGORIES_URL, PETS_URL, PET_DELETE_URL, PET_UPLOAD_URL } from '../shared/constants/urls';
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

  uploadPet(formData: FormData): Observable<Pet> {
    console.log('Uploading pet with FormData:', formData);

    formData.forEach((value, key) => {
      console.log(`FormData entry - Key: ${key}, Value: ${value}`);
    });

    return this.http.post<any>(PET_UPLOAD_URL, formData).pipe(
      map(response => {
        console.log('Response from server:', response);
        if (response && response.pet) {
          return response.pet as Pet;
        }
        throw new Error('Invalid response format');
      }),
      catchError((error) => {
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
};
