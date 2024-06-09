import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../shared/models/Pet';
import { FavoritesService } from '../../../services/favorites.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css'
})
export class PetPageComponent implements OnInit{
  pet!: Pet;
  constructor(activatedRoute: ActivatedRoute, petService: PetService,
    private favoritesService: FavoritesService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        this.pet = petService.getPetById(params.id);
    })
  }

  ngOnInit(): void {

  }

  addToFavorites() {
    this.favoritesService.addToFavorites(this.pet);
    this.router.navigateByUrl('/favorites-page')
  }
}