import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface ConfigDialog extends MatDialogConfig {
  data: {
    title: string;
    passedData?: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);

  open(component: ComponentType<any>, config: ConfigDialog) {
    console.log(config);
    this.dialog.open(component, config);
  }
}
