import { inject, Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    snackBar = inject(MatSnackBar);

    openSnackBar(message: string, action: string = 'Zamknij', duration: number = 3000) {
        this.snackBar.open(message, action, {
            duration,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}