import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-adopt-dialog',
  templateUrl: './pet-adopt-dialog.component.html',
  styleUrls: ['./pet-adopt-dialog.component.css']
})
export class PetAdoptDialogComponent {
  @Input() visible: boolean = false;
  @Input() petName: string = '';
  @Input() ownerName: string = '';
  @Input() ownerPhoneNumber: string = '';

  close() {
    this.visible = false;
    location.reload();
  };
}
