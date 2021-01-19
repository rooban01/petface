import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DogForm } from 'src/app/models/dogForm.model';
import { AuthService } from '../authService/auth.service';

const BACKEND_URL = environment.apiUrl + "/dog";


@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService){}
  private dogs: DogForm[] = [];
  private dogData: DogForm[]=[]
  private dogsUpdated = new Subject<DogForm[]>();
  private dogDataUpdated = new Subject<DogForm[]>();



  getDogsUpdatedListener(){
    return this.dogsUpdated.asObservable();
  }

  getDogDataListener(){
    return this.dogDataUpdated.asObservable();
  }

  getDogs(userId:string){
    console.log("servce"+userId)
    this.httpClient.get<{message: string, data:any, success:string}>(BACKEND_URL+"/user/"+userId)
          .pipe(map((dogData) => {
             return dogData.data.map(dog =>{

               return{
                id_dog: dog.id_dog,
                id_user: dog.id_user,
                firstname: dog.firstname,
                lastname: dog.lastname,
                sex: dog.sex,
                race: dog.race,
                puce_num: dog.puce_nu,
                birth_date:dog.birth_date,
                birth_certificate_num: dog.birth_certificate_nu,
                passport_num: dog.passport_nu,
                created_at: dog.created_at
               };
             });
          }))
          .subscribe((transformedDogsData) => {
                this.dogs = transformedDogsData;
                this.dogsUpdated.next([...this.dogs]);

          });

    }


getDogById(dogId){
   this.httpClient.get<{data:any, message:string, success:string}>(BACKEND_URL+"/"+dogId)
   .pipe(map((data) => {
    return data.data.map(dogData =>{
        return{
         id_dog: dogData.id_dog,
         id_user: dogData.id_user,
         firstname: dogData.firstname,
         lastname: dogData.lastname,
         sex: dogData.sex,
         race: dogData.race,
         puce_num: dogData.puce_nu,
         birth_date:dogData.birth_date,
         birth_certificate_num: dogData.birth_certificate_nu,
         passport_num: dogData.passport_nu,
         created_at: dogData.created_at
        };
      });
   }))
   .subscribe((transformedDogData) => {
         this.dogData = transformedDogData;
         this.dogDataUpdated.next([...this.dogData]);

   });
    }


}
