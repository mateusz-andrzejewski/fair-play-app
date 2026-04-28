import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlayerCreatePayload, PreferredPositionEnum } from '@fair-play-app/types';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class PlayerFormComponent {
  dialogData = inject<{ title: string; passedData: any; size: string }>(
    MAT_DIALOG_DATA,
  );
  private dialogRef = inject(MatDialogRef<PlayerFormComponent>);
  private fb = inject(FormBuilder);
  private playersService = inject(PlayersService);
  positionList = this.playersService.positionList;

  form = this.fb.group({
    firstName: this.fb.control<string>('', [Validators.required]),
    lastName: this.fb.control<string>('', [Validators.required]),
    preferredPosition: this.fb.control<PreferredPositionEnum>(PreferredPositionEnum.MIDFIELDER, [Validators.required]),
    skillRate: this.fb.control<number>(5, [Validators.required, Validators.min(1), Validators.max(10)]),
    nickname: this.fb.control<string>(''),
  });

  onSave(): void {
    if (this.form.valid) {
      const payload = this.form.getRawValue() as PlayerCreatePayload;
      this.playersService.createPlayer(payload).subscribe(() => {
        //todo: add notification about success or failure
        this.dialogRef.close({action: 'save'});
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(); 
  }
}
