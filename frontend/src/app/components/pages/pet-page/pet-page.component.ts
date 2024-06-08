import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../shared/models/Pet';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css'
})
export class PetPageComponent {
pet!: Pet;
constructor(activatedRoute:ActivatedRoute, petService:PetService) {
  activatedRoute.params.subscribe((params) => {
    if(params.id)
      this.pet = petService.getPetById(params.id);
  })
  //onInit?
}
}
