//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../shared/models/Pet';
import { PetService } from '../../../services/pet.service';
import { AppRoutingModule } from '../../../app-routing.module';
import { HeaderComponent } from '../../partials/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { CategoriesComponent } from '../../partials/categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppRoutingModule, HeaderComponent, NgFor, NgIf, SearchComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  //styleUrl: './home.component.css'
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