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
  private favorites: Favorites = this.getFavoritesFromLocalStorage();
  private favoriteSubject: BehaviorSubject<Favorites> = new BehaviorSubject(this.favorites);
  constructor() { }

  addToFavorites(pet: Pet): void {
    let favoritePet = this.favorites.pets.find(item => item.pet.id == pet.id)
    if (favoritePet)
      return;
    this.favorites.pets.push(new FavoritePet(pet));
    this.setFavoritesToLocalStorage();
  }

  removeFromFavorites(petId: string): void {
    this.favorites.pets = this.favorites.pets.filter(item => item.pet.id != petId);
    this.setFavoritesToLocalStorage();
  }

  clearFavorites() {
    this.favorites = new Favorites();
  }

  getFavoritesObservable(): Observable<Favorites> {
    return this.favoriteSubject.asObservable();
  }

  private setFavoritesToLocalStorage(): void {
    this.favorites.totalCount = this.favorites.pets.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);  //neccessary?
    const favoritesJson = JSON.stringify(this.favorites);
    localStorage.setItem('Favorites', favoritesJson);
    this.favoriteSubject.next(this.favorites);
  }

  private getFavoritesFromLocalStorage(): Favorites {
    const favoritesJson = localStorage.getItem('Favorites');
    return favoritesJson ? JSON.parse(favoritesJson) : new Favorites();
  }
}
