import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelToken } from 'src/app/models/ModelToken.models';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-menus-page',
  templateUrl: './menus-page.component.html',
  styleUrls: ['./menus-page.component.css']
})
export class MenusPageComponent implements OnInit {
  private auth: AuthService;
  protected modelToken!: ModelToken;

  constructor(private router: Router) {
    this.auth = new AuthService();    
  }
  
  ngOnInit(): void {
    this.modelToken = this.auth.getModelFromToken();
  }

  public async dashBoard() {
    
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
