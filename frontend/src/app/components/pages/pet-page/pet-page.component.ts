import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../shared/models/Pet';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})

export class PetPageComponent implements OnInit {
  pet!: Pet;

  constructor(
    activatedRoute: ActivatedRoute,
    petService: PetService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        petService.getPetById(params.id).subscribe(serverPet => {
          this.pet = serverPet;
        });
      }
    });
  };

  ngOnInit(): void { }

  addToFavorites() {
    if (this.pet) {
      this.favoritesService.addToFavorites(this.pet);
      this.router.navigateByUrl('/favorites-page');
    };
  };
};
