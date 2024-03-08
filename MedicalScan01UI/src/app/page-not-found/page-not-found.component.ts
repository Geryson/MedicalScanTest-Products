import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit, OnDestroy{

  constructor(private notificationService: NotificationService, private router: Router) {

  }

  ngOnInit(): void {
    this.notificationService.createNotification('The requested page on this website does not exist. Redirecting to the product list...');
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    
  }
}
