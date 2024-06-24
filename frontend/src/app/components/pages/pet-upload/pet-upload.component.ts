import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../shared/models/Pet';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-pet-upload',
  templateUrl: './pet-upload.component.html',
  styleUrls: ['./pet-upload.component.css']
})

export class PetUploadComponent implements OnInit {
  selectedFile!: File;
  imageInvalid: boolean = false;
  imageFile: File | null = null;
  user!: User;

  pet: Pet = {
    id: '',
    name: '',
    age: 0,
    species: '',
    breed: '',
    gender: '',
    favorite: false,
    imageUrl: '',
    color: '',
    description: '',
    location: '',
    categories: [] as string[],
    //user: '',
  };
  availableCategories = ['Cat', 'Dog', 'Rabbit', 'Male', 'Female'];

  constructor(
    private petService: PetService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  };

  petFormValid(): boolean {
    if (this.pet.age < 0) {
      return false;
    };

    if (!['Hím', 'Nőstény'].includes(this.pet.gender)) {
      return false;
    };

    if (this.pet.age < 0) {
      return false;
    };

    if (!this.pet.name || !this.pet.species || !this.pet.breed || !this.pet.gender ||
      !this.pet.color || !this.pet.description || !this.pet.location) {
      return false;
    };

    return true;
  };

  onSubmit(form: NgForm) {
    if (!this.userService.isLoggedIn()) {
      this.toastrService.info(`Uploading pets is only available to logged in users!`, 'Login Required');
      return;
    };

    if (form.invalid || this.imageInvalid) {
      this.toastrService.error('Please fill all of the fields with a valid value!', 'Error');
      return;
    };

    if (form.invalid || this.imageInvalid || !this.petFormValid()) {
      this.toastrService.error('Please fill all of the fields with a valid value!', 'Error');
      return;
    };

    const formData = new FormData();
    for (const key in this.pet) {
      if (key === 'categories') {
        formData.append('categories', JSON.stringify(this.generateCategories()));
      } else {
        const value = (this.pet as any)[key];
        formData.append(key, value);
      };
    };
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    };

    this.petService.uploadPet(formData).subscribe({
      next: (response: Pet) => {
        this.toastrService.success(`Pet uploaded successfully!`, 'Thank you ♥');
        console.log('Pet uploaded successfully', response);
        this.router.navigateByUrl('/');
      },
      error: (error: any) => {
        this.toastrService.error(`Failed to upload pet.`, 'Please check your input and try again.');
        console.error('Error uploading pet:', error);
      }
    });

  };

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageInvalid = false;
    } else {
      this.imageInvalid = true;
    };
  };

  onCategoryChange(event: any) {
    const category = event.target.value;
    if (event.target.checked) {
      this.pet.categories.push(category);
    } else {
      const index = this.pet.categories.indexOf(category);
      if (index > -1) {
        this.pet.categories.splice(index, 1);
      };
    };
  };

  generateCategories(): string[] {
    const categories: string[] = [];
    if (this.pet.gender === 'Hím') {
      categories.push('Male');
    } else if (this.pet.gender === 'Nőstény') {
      categories.push('Female');
    };

    switch (this.pet.species.toLowerCase()) {
      case 'macska':
        categories.push('Cat');
        break;
      case 'kutya':
        categories.push('Dog');
        break;
      case 'nyúl':
        categories.push('Rabbit');
        break;
    };

    return categories;
  };
};
