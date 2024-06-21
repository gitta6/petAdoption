import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { Favorites } from '../../../shared/models/Favorites';
import { FavoritePet } from '../../../shared/models/FavoritePet';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
    favorites!: Favorites;
    private favoritesSubscription: Subscription;

    constructor(private favoritesService: FavoritesService) {
      this.favoritesSubscription = this.favoritesService.getFavoritesObservable().subscribe((favorites) => {
        this.favorites = favorites;
      });
     };

    ngOnInit(): void {
        this.favoritesService.loadFavorites();
        this.favoritesSubscription = this.favoritesService.getFavoritesObservable().subscribe((favorites) => {
            this.favorites = favorites;
        });
    };

    ngOnDestroy(): void {
        if (this.favoritesSubscription) {
            this.favoritesSubscription.unsubscribe();
        };
    };

    removeFromFavorites(favoritePet: FavoritePet) {
        if (favoritePet && favoritePet.pet && favoritePet.pet.id) {
            this.favoritesService.removeFromFavorites(favoritePet.pet.id);
        } else {
            console.error('Invalid favoritePet object or pet id');
        };
    };
};
