import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../shared/models/Pet';
import { PetService } from '../../../services/pet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  pets: Pet[] = [];
  
  constructor(private petService: PetService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.pets = this.petService.getAllPetsBySearchTerm(params.searchTerm);
      else if (params.category)
        this.pets = this.petService.getAllPetsByCategory(params.category);
      else
        this.pets = petService.getAll();
    })
  }

  ngOnInit(): void {

  }
}