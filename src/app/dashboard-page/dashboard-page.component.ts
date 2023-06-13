import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  private auth : AuthService;

  constructor(private router : Router) {
    this.auth = new AuthService();
  }

  ngOnInit() : void {
    var token = this.auth.getToken();

    if(!token)
      this.router.navigate(['/']);    
  }

}
