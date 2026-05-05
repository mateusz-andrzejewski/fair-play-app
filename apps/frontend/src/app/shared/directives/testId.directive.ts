import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
    selector: "[testId]",
})
export class TestIdDirective {
    @Input("testId") value = "";

    @HostBinding("attr.data-testid")

    get dataTestId() {
        return this.value;
    }

    constructor() {}
}