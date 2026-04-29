import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { DialogActionEnum } from "../../enums/dialog-action.enum";
import { DialogService } from "../../services/dialog.service";
import { SnackbarService } from "../../services/snackbar.service";

@Component({
    selector: "app-confirmation-modal",
    templateUrl: "confirmation-modal.component.html",
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        NgClass,
    ]
})
export class ConfirmationModalComponent {
    dialogData = inject<{ title: string; passedData: { element: any; message: string }; size: string }>(MAT_DIALOG_DATA);
    dialogService = inject(DialogService);
    snackbarService = inject(SnackbarService);
    private dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

    onConfirm(): void {
        this.dialogRef.close({action: DialogActionEnum.CONFIRM});
    }

    onClose(): void {
        this.dialogRef.close({action: DialogActionEnum.CANCEL});
    }
}