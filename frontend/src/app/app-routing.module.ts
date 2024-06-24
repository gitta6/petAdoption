import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PetPageComponent } from './components/pages/pet-page/pet-page.component';
import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PetUploadComponent } from './components/pages/pet-upload/pet-upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'category/:category', component: HomeComponent },
  { path: 'pet/:id', component: PetPageComponent },
  { path: 'favorites-page', component: FavoritesPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'pet-upload', component: PetUploadComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }