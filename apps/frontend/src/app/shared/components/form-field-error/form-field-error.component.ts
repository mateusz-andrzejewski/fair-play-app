import { Component, input } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";
import { MatError } from "@angular/material/form-field";

@Component({
    selector: "app-form-field-error",
    templateUrl: "form-field-error.component.html",
    imports: [MatError],
}) export class FormFieldErrorComponent {
    control = input.required<FormControl>();

    get errorKeys(): string[] {
        return Object.keys(this.control()!.errors || {});
    }

    get errors(): ValidationErrors {
        return this.control()!.errors ?? {};
    }

    getErrorMessage(errorKey: string): string {
        const errorValue = this.errors[errorKey];
        const messages: Record<string, string> = {
            required: "To pole jest wymagane",
            minlength: `Minimalna długość to ${errorValue.requiredLength} znaków`,
            maxlength: `Maksymalna długość to ${errorValue.requiredLength} znaków`,
            min: `Minimalna wartość to ${errorValue.min}`,
            max: `Maksymalna wartość to ${errorValue.max}`,
        };
        return messages[errorKey] || "Nieprawidłowa wartość";
    }
}