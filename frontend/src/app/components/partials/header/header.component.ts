import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  favoritesQuantity = 0;
  user!: User;

  constructor(favoritesService: FavoritesService, private userService: UserService) {
    favoritesService.getFavoritesObservable().subscribe((newFavorites) => {
      this.favoritesQuantity = newFavorites.totalCount;
    });
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  };

  ngOnInit(): void {

  };

  logout() {
    this.userService.logout();
  };

  get isAuthenticated() {
    return this.user.token;
  };
}

