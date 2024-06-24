import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchComponent } from './components/partials/search/search.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { PetPageComponent } from './components/pages/pet-page/pet-page.component';
import { FavoritesPageComponent } from './components/pages/favorites-page/favorites-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation-component/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { UserService } from './services/user.service';
import { PetUploadComponent } from './components/pages/pet-upload/pet-upload.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchComponent, CategoriesComponent,
    PetPageComponent, FavoritesPageComponent, TitleComponent, NotFoundComponent, LoginPageComponent,
    RegisterPageComponent, DefaultButtonComponent, InputContainerComponent, InputValidationComponent, TextInputComponent,
    LoadingComponent, PetUploadComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule,
    ReactiveFormsModule, FormsModule,
    ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-bottom-right', newestOnTop: false })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }