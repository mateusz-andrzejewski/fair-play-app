import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogSizeEnum } from './enums/dialog-size.enum';

export interface ConfigDialog extends MatDialogConfig {
  data: {
    title: string;
    size: DialogSizeEnum;
    passedData?: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);

  open(component: ComponentType<any>, config: ConfigDialog) {
    return this.dialog.open(component, config).afterClosed();
  }
}
