import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  /*favoritesQuantity=0;
  constructor(favoritesService:FavoritesService) {
    favoritesService.getFavoritesObservable().subscribe((newFavorites) => {
      this.favoritesQuantity = newFavorites.totalCount;
    })
  }
*/
  ngOnInit(): void {

  }
}

