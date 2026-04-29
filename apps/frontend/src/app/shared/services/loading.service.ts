import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    readonly isLoading = signal(false);
    private activeRequests = 0;
    
    show(): void {
        this.activeRequests++;
        this.isLoading.set(true);
    }

    hide(): void {
        this.activeRequests--;
        if (this.activeRequests <= 0) {
            this.isLoading.set(false);
            this.activeRequests = 0;
        }
    }
}