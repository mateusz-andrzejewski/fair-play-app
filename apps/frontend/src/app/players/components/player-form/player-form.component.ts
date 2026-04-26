import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
})
export class PlayerFormComponent {
  dialogData = inject<{ title: string; passedData: any }>(MAT_DIALOG_DATA);
}
