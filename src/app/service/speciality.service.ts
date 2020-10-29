import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Speciality } from '../class/speciality';
import {  } from "module";
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  specilityList;


  constructor(private firespecilities:AngularFireDatabase, private http:HttpClient) {
    
    this.specilityList= this.firespecilities.object('especialidades').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   createSpecility(speciality:Speciality){
     
     return this.http.post(environment.firebase.databaseURL+"/especialidades.json",speciality);
     

  }

  getSpecilities(){
    return this.specilityList;
  }



/****Generic Function */

  private objecToArray( datos: Object ){
    const specilities = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let speciality: any = datos[key];
          speciality.id=key;
          specilities.push(speciality);
        
    })
    return specilities;
  }

}
