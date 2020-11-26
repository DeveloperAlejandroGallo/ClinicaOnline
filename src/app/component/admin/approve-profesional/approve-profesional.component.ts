import { Component, OnInit } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-approve-profesional',
  templateUrl: './approve-profesional.component.html',
  styleUrls: ['./approve-profesional.component.scss']
})
export class ApproveProfesionalComponent implements OnInit {

  constructor(private usrService: UserService,
    private appointServ: AppointmentService) { }

  profesional: User = null;
  specialitiesDaysList: Array<{
    spec: Speciality,
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean
  }>;

  specDays: {
    spec: Speciality,
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean
  };




  speciality: Speciality;
  sunday: boolean = false;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean = false;

  ngOnInit(): void {
  }

  public getUser(usr: User) {

    this.profesional = usr;
    this.specialitiesDaysList = usr.specialitiesDays;

  }


  public approveProfesional() {

    if (this.setDaysOfAttention()) {

      this.usrService.changeUserApproved(this.profesional.id, true, this.specialitiesDaysList);
      Swal.fire({
        title: 'Aprobado!',
        text: 'El profesional ' + this.profesional.name + ', ' + this.profesional.lastName + ' ya puede comenzar a atender',
        icon: 'success'
      });
    }
  }

  public setDaysOfAttention(): boolean {
    if (this.monday || this.tuesday || this.wednesday || this.thursday || this.friday || this.saturday || this.sunday) {
      if (this.specialitySelected !== (undefined && null)) {
        this.specDays.spec = this.speciality;
        this.specDays.sunday =    this.specDays.saturday = false;
        this.specDays.monday =    this.monday;
        this.specDays.tuesday =   this.tuesday;
        this.specDays.wednesday = this.wednesday;
        this.specDays.thursday =  this.thursday;
        this.specDays.friday =    this.friday;

        this.specialitiesDaysList.push(this.specDays);

        this.specDays.spec = null ;
        this.specDays.sunday =   
        this.specDays.monday =   
        this.specDays.tuesday =  
        this.specDays.wednesday =
        this.specDays.thursday = 
        this.specDays.friday =  false;

        return true;
      } 
      else {  
        Swal.fire({ 
          title: 'Atención',  
          text: 'Debe elegir al una especialidad',
          icon: 'warning'
        });
        return false;
      }
    }
    else {
      Swal.fire({
        title: 'Atención',
        text: 'Debe elegir al menos un día de atención',
        icon: 'warning'
      });
      return false;
    }
  }

  public getDays(sd: {spec: Speciality,sunday: boolean,monday: boolean,tuesday: boolean,wednesday: boolean,thursday: boolean,friday: boolean,saturday: boolean}): string {
    let days: string;
    days = sd.monday ? 'Lunes -' :'' +
           sd.tuesday ? 'Martes -' : '' +
           sd.wednesday ? 'Miércoles -' : '' +
           sd.thursday ? 'Jueves -' : '' +
           sd. friday ? 'Viernes -' : '';

     return 'Especialidad: ' + sd.spec.name + ' - Atiende: ' + days.slice(0, -1); 
  }

  public recieveSpeciality(e: Speciality) {
    this.speciality = e;
  }

  public profesionalSelected(): boolean {
    return this.profesional != (undefined && null);
  }

  public specialitySelected() {
    return this.speciality != (null && undefined)
  }

  public changeProfesional() {
    this.profesional = null;
  }
  public changeSpeciality() {
    this.speciality = null;
  }
}
