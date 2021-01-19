import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  // enteredVet= '';
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) { }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {

      });

    this.registerForm = new FormGroup({
      // is_vet: new FormControl(null),
      email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
      password: new FormControl(null, {validators:[Validators.required, Validators.minLength(6)]})
    })

  }
onSubmit(){
  if(this.registerForm.invalid){

    return  ;
  }

  this.authService.registerUser(null,this.registerForm.value.email, this.registerForm.value.password,null, null,null,null,null,null);

}

}
