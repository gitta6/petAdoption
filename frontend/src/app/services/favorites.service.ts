import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Favorites } from '../shared/models/Favorites';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet } from '../shared/models/Pet';
import { FavoritePet } from '../shared/models/FavoritePet';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Favorites = new Favorites;
  private favoriteSubject: BehaviorSubject<Favorites> = new BehaviorSubject(this.favorites);
  constructor() { }

  addToFavorites(pet: Pet): void {
    let favoritePet = this.favorites.pets.find(item => item.pet.id === pet.id)
    if (favoritePet)
      return;
    this.favorites.pets.push(new FavoritePet(pet));
    this.updateFavorites();
  };

  removeFromFavorites(petId: string): void {
    this.favorites.pets = this.favorites.pets.filter(item => item.pet.id != petId);
    this.updateFavorites();
  };

  clearFavorites() {
    this.favorites = new Favorites();
    this.updateFavorites();
  };

  getFavoritesObservable(): Observable<Favorites> {
    return this.favoriteSubject.asObservable();
  };

  getFavorites() : Favorites {
    return this.favoriteSubject.value;
  };

  private updateFavorites(): void {
    this.favorites.totalCount = this.favorites.pets.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    this.favoriteSubject.next(this.favorites);
  };
}
