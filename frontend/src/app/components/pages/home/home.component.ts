import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../shared/models/Pet';
import { PetService } from '../../../services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DEFAULT_PET_IMAGE_URL } from '../../../constants/defaultImage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pets: Pet[] = [];  
  defaultImageUrl : string = DEFAULT_PET_IMAGE_URL;

  constructor(private petService: PetService, activatedRoute: ActivatedRoute) {
    let petsObservable: Observable<Pet[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        petsObservable = this.petService.getAllPetsBySearchTerm(params.searchTerm);
      else if (params.category)
        petsObservable = this.petService.getAllPetsByCategory(params.category);
      else
        petsObservable = petService.getAll();

      petsObservable.subscribe((serverPets) => {
        this.pets = serverPets;
      });
    });
  };

  ngOnInit(): void {

  };
};