import { Component } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { Favorites } from '../../../shared/models/Favorites';
import { FavoritePet } from '../../../shared/models/FavoritePet';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {
  favorites!: Favorites;
  constructor(private favoritesService:FavoritesService) {
    this.favoritesService.getFavoritesObservable().subscribe((favorites) => {
      this.favorites = favorites;
    })
  }

  removeFromFavorites(favoritePet:FavoritePet){
    this.favoritesService.removeFromFavorites(favoritePet.pet.id);
  }
}
