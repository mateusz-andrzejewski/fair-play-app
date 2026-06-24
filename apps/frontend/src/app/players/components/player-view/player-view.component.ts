import { DatePipe, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackbarService } from "../../../shared/services/snackbar.service";
import { Player } from "@fair-play-app/types";
import { DialogSizeEnum } from "../../../shared/enums/dialog-size.enum";
import { TestIdDirective } from "../../../shared/directives/testId.directive";

@Component({
    selector: "app-player-view",
    templateUrl: "player-view.component.html",
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        NgClass,
        DatePipe,
        TestIdDirective
    ]
})
export class PlayerViewComponent {
  dialogData = inject<{ title: string; passedData: Player; size: DialogSizeEnum }>(MAT_DIALOG_DATA);
  snackbarService = inject(SnackbarService);
  private dialogRef = inject(MatDialogRef<PlayerViewComponent>);

  onClose(): void {
    this.dialogRef.close();
  }
}