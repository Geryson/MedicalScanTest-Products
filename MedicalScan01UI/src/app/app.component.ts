import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './shared/notification-service.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MedicalScan01UI';
  
  notificationSubscription = new Subscription();

  constructor(private httpClient: HttpClient, private notificationService: NotificationService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    let snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = 10000;

    this.notificationSubscription = this.notificationService.notificationSubject.subscribe(message => {
      this.snackBar.open(message, '', snackBarConfig);
    })
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
