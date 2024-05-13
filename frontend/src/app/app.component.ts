import { Component } from '@angular/core';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}