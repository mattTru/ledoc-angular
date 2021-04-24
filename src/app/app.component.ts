import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../app/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LEDOC';

  constructor(public tokenStorageService: TokenStorageService, private router: Router) { }

  logout() {
    this.tokenStorageService.disconnect();
    this.router.navigate(['/']);
  }
}
