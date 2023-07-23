import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHandler } from 'src/app/handlers/authHandler';

@Component({
  selector: 'app-head-frame',
  template: '<app-menus-page></app-menus-page><router-outlet></router-outlet>',
})

export class HeadFrameComponent {
  constructor(private router: Router) {
    var authHandler = new AuthHandler();
    if(! authHandler.canActivate()){
      this.router.navigate(['/login']);
    }    
  }
}
