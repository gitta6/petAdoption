import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchComponent } from './components/partials/search/search.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }