import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../shared/models/Pet';
import { FavoritesService } from '../../../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})

export class PetPageComponent implements OnInit {
  pet!: Pet;
  message: string = 'default';
  user!: User;
  isAdmin: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private petService: PetService,
    private favoritesService: FavoritesService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        petService.getPetById(params.id).subscribe(serverPet => {
          this.pet = serverPet;
        });
      }
    });
    this.isAdmin = this.userService.isAdmin();
  };

  get isAuthenticated() {
    return this.user;
  };

  ngOnInit(): void { }

  addToFavorites() {
    if (!this.userService.isLoggedIn()) {
      this.toastrService.info(`Adding to favorites is only available to logged in users!`, 'Login Required');
      return;
    }

    if (this.pet) {
      this.favoritesService.addToFavorites(this.pet);
      this.toastrService.success(`To remove, go to your Favorites page.`, 'This pet is one of your favorites! ♥');
    };
  };

  onDeletePet(id: string) {
    if (confirm('Are you sure you want to delete this pet?')) {
      console.log('Deleting pet with ID:', id);

      this.petService.deletePet(id).subscribe({
        next: () => {
          this.toastrService.success(`Pet deleted successfully!`);
          console.log('Pet deletion process completed.');
          //window.location.reload();
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.toastrService.error(`Failed to delete pet.`, 'Error');
          console.error('Error deleting pet:', error);
        }
      });
    };
  };
};
