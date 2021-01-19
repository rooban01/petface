import { Component } from '@angular/core';
import { AuthService } from './services/authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isViewable: boolean;

  constructor (private authService: AuthService){}

  ngOnInit(){
     this.authService.autoAuthUser();

  }
}
