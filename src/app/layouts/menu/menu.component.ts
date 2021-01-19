import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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
