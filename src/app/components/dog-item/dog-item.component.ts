import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogForm } from 'src/app/models/dogForm.model';
import { DogService } from 'src/app/services/dogService/dog.service';


@Component({
  selector: 'app-dog-item',
  templateUrl: './dog-item.component.html',
  styleUrls: ['./dog-item.component.css']
})
export class DogItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dogService: DogService) { }
  datas: DogForm[]=[];

private dogSub : Subscription;

private dogId: number = +this.route.snapshot.paramMap.get('dogId');

  ngOnInit(){
   this.handleDogDetails();
  }

handleDogDetails(){
  this.dogId ;
  this.dogService.getDogById(this.dogId);
  this.dogSub = this.dogService.getDogDataListener()
  .subscribe((dogData: DogForm[]) => {
   this.datas=dogData;
  });

}



}
