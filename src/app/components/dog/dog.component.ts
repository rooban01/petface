import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogForm } from 'src/app/models/dogForm.model';
import { AuthService } from 'src/app/services/authService/auth.service';
import { DogService } from 'src/app/services/dogService/dog.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css'],
})
export class DogComponent implements OnInit {
  constructor(public dogService: DogService,public authService: AuthService, public route: ActivatedRoute) {}

dogs: DogForm []=[];
private dogSub : Subscription;
private authStatusSub : Subscription;
userId: string;
userIsAuthenticated = false;

  ngOnInit(){
this.userId = this.authService.getUserId();
this.dogService.getDogs(this.userId);
this.dogSub = this.dogService.getDogsUpdatedListener()
.subscribe((dogs: DogForm[]) => {
 this.dogs=dogs;
});


this.userIsAuthenticated = this.authService.getIsAuth();
this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAthenticated =>{
this.userIsAuthenticated = isAthenticated;

});
  }


  ngOnDestroy() {
    this.dogSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
