import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../class/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentList;

  constructor(private fireAppointment:AngularFireDatabase, private http:HttpClient) {
    
    this.appointmentList= this.fireAppointment.object('turnos').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   createAppointment(appointment:Appointment){
     return this.http.post(environment.firebase.databaseURL+"/turnos.json",appointment);
  }

  getAppointment(){
    this.appointmentList= this.fireAppointment.object('turnos').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));
    return this.appointmentList;
  }

  changeAppointmentStatus(id:string,state:boolean){
    return this.http.patch(environment.firebase.databaseURL+"/turnos/"+id+".json",{isActive:state}).subscribe(resp=>{
    });    
  }
 


/****Generic Function */

  private objecToArray( datos: Object ){
    const appointments = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let appointment: any = datos[key];
          appointment.id=key;
          appointments.push(appointment);
        
    })
    return appointments;
  }

}
