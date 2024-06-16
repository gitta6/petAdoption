import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchComponent } from './components/partials/search/search.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PetPageComponent } from './components/pages/pet-page/pet-page.component';
import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchComponent, CategoriesComponent, PetPageComponent, FavoritesPageComponent, TitleComponent, NotFoundComponent, LoginPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule,
    HttpClientModule, ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-bottom-right', newestOnTop: false })],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }