import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Pet } from '../shared/models/Pet';
import { FavoritePet } from '../shared/models/FavoritePet';
import { Favorites } from '../shared/models/Favorites';
import { USER_FAVORITES_ADD_URL, USER_FAVORITES_REMOVE_URL, USER_FAVORITES_URL } from '../shared/constants/urls';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  private favorites: Favorites = new Favorites();
  private favoriteSubject: BehaviorSubject<Favorites> = new BehaviorSubject<Favorites>(this.favorites);

  constructor(private http: HttpClient, private userService: UserService) {
    this.loadFavorites();
  }

  addToFavorites(pet: Pet) {
    this.userService.getToken().pipe(
      filter(token => token !== null),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post<{ message: string }>(USER_FAVORITES_ADD_URL, { petId: pet.id }, { headers });
      })
    ).subscribe({
      next: response => {
        console.log(response.message);
        let favoritePet = this.favorites.pets.find(item => item.pet.id === pet.id);
        if (!favoritePet) {
          this.favorites.pets.push(new FavoritePet(pet));
          this.updateFavorites();
        }
      },
      error: error => {
        console.error('Error adding pet to favorites:', error);
      }
    });
  };

  loadFavorites(): void {
    this.userService.getToken().pipe(
      filter(token => token !== null),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.get<Pet[]>(USER_FAVORITES_URL, { headers });
      }),
      tap(pets => {
        this.favorites.pets = pets.map(pet => new FavoritePet(pet));
        this.updateFavorites();
      })
    ).subscribe({
      error: error => {
        console.error('Error loading favorite pets:', error);
      }
    });
  };

  removeFromFavorites(petId: string): void {
    this.userService.getToken().pipe(
      filter(token => token !== null),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post<{ message: string }>(USER_FAVORITES_REMOVE_URL, { petId }, { headers });
      })
    ).subscribe({
      next: response => {
        console.log(response.message);
        this.favorites.pets = this.favorites.pets.filter(item => item.pet.id !== petId);
        this.updateFavorites();
      },
      error: error => {
        console.error('Error removing pet from favorites:', error);
      }
    });
  };

  clearFavorites() {
    this.favorites = new Favorites();
    this.updateFavorites();
  };

  getFavoritesObservable(): Observable<Favorites> {
    return this.favoriteSubject.asObservable();
  };

  getFavorites(): Favorites {
    return this.favoriteSubject.value;
  };

  private updateFavorites(): void {
    this.favorites.totalCount = this.favorites.pets.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    this.favoriteSubject.next(this.favorites);
  };
};
