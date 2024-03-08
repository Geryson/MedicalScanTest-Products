import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class NotificationService {
    notificationSubject = new Subject<string>();

    createNotification(message: string) {
        this.notificationSubject.next(message);
    }
}