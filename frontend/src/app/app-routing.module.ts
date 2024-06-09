import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { PetPageComponent } from './components/pages/pet-page/pet-page.component';
import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'category/:category', component: HomeComponent },
  { path: 'pet/:id', component: PetPageComponent },
  { path: 'favorites-page', component: FavoritesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }