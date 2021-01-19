import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService){}

  ngOnInit() {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {

      });
    this.loginForm = new FormGroup({
      email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
      password: new FormControl(null, {validators:[Validators.required, Validators.minLength(6)]})
    });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

onSubmit(){
  if(this.loginForm.invalid){
    return;
  }

  this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
}
}
