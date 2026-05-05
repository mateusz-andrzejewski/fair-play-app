import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlayerCreatePayload, PreferredPositionEnum } from '@fair-play-app/types';
import { FormFieldErrorComponent } from '../../../shared/components/form-field-error/form-field-error.component';
import { DialogActionEnum } from '../../../shared/enums/dialog-action.enum';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { PlayersService } from '../../services/players.service';
import { DialogSizeEnum } from '../../../shared/enums/dialog-size.enum';
import { TestIdDirective } from '../../../shared/directives/testId.directive';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormFieldErrorComponent,
    TestIdDirective
  ],
})
export class PlayerFormComponent implements OnInit {
  dialogData = inject<{ title: string; passedData: any; size: DialogSizeEnum }>(
    MAT_DIALOG_DATA,
  );
  snackbarService = inject(SnackbarService);
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

  ngOnInit(): void {
    if (this.dialogData.passedData) {
      this.form.patchValue(this.dialogData.passedData);
    }
  }

  onSave(): void {
    const mode = this.dialogData.passedData ? 'edit' : 'create';
    if (this.form.valid) {
      const payload = this.form.getRawValue() as PlayerCreatePayload;
      this.handleFormAction(mode, payload);
      
    } else {
      this.form.markAllAsTouched();
    }
  }
  handleFormAction(mode: 'create' | 'edit', payload: PlayerCreatePayload) {
    if (mode === 'create') {
      this.playersService.createPlayer(payload).subscribe(() => {
        this.snackbarService.openSnackBar('Gracz został dodany');
        this.dialogRef.close({action: DialogActionEnum.SAVE});
      });

    }

    if (mode === 'edit') {
      this.playersService.editPlayer(this.dialogData.passedData.id, {...payload, id: this.dialogData.passedData.id}).subscribe(() => {
        this.snackbarService.openSnackBar('Gracz został edytowany');
        this.dialogRef.close({action: DialogActionEnum.EDIT});
      });
    }  
  
  }

  onClose(): void {
    this.dialogRef.close(); 
  }
}
