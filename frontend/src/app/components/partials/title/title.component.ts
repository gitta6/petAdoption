import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  constructor() { }

  @Input()
  title!: string;

  @Input()
  margin? = '1rem 0 1rem 0.3rem'

  @Input()
  fontSize? = '2rem';
}
