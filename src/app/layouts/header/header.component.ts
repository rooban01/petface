import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authservice: AuthService) { }

  ngOnInit(){
    this.userIsAuthenticated = this.authservice.getIsAuth();
    this.authListenerSubs = this.authservice.getAuthStatusListener().subscribe( isAutheticated => {
      this.userIsAuthenticated = isAutheticated;
    });
  }
  onLogout(){
    this.authservice.logout();
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
 }
}
