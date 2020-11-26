import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Speciality } from '../class/speciality';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  specialityList;

  constructor(private firespecilities:AngularFireDatabase, private http:HttpClient) {
    
    this.specialityList= this.firespecilities.object('especialidades').valueChanges().pipe(map(data=>{
      return this.objecToArray(data)
    }));
    // this.specialityList = this.http.get(environment.firebase.databaseURL+"/especialidades.json").pipe(map(data=>{
    //   return this.objecToArray(data);
    // }));

   }

   createSpeciality(speciality:Speciality){
     
     return this.http.post(environment.firebase.databaseURL+"/especialidades.json",speciality);
  }

  getSpecialities(){
    return this.http.get(environment.firebase.databaseURL+"/especialidades.json").pipe(map(resp=>{
      return this.filter(resp)
    }));
  }

  public filter(res: any) {
    let array;
    let aux=[];
    array=this.objecToArray(res);
    console.log('En el filter: ' + array);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
          aux.push(element);
          console.log(element);
      }
      return aux;
  }

/****Generic Function */

  private objecToArray( data: Object ){
    const array = [];
    if(data == null) return [];

    Object.keys( data ).forEach( key =>{
          let element: any = data[key];
          element.id=key;
          array.push(element);
          console.log('Cada elemento: ' + element.name);
    })
    return array;
  }

}
