import { Component, OnInit } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { SpecialityDays } from 'src/app/class/speciality-days';
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
  specialitiesDaysList = new Array<SpecialityDays>();

  specDays: SpecialityDays;

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
    if (usr.specialitiesDays != (undefined && null)) {
      this.specialitiesDaysList = usr.specialitiesDays;
    }
  }

  public addAttention() {
    if (this.setDaysOfAttention()) {
      this.usrService.changeUserSpecialityDays(this.profesional.id,this.specialitiesDaysList);
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title:  'Días de Atención',
        text: 'Correctamente configurados.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public approveProfesional() {

    this.usrService.changeUserApproved(this.profesional.id, true);
    Swal.fire({
      title: 'Aprobado!',
      text: 'El profesional ' + this.profesional.name + ', ' + this.profesional.lastName + ' ya puede comenzar a atender',
      icon: 'success'
    }).then(r =>{
      this.changeSpeciality();
      this.changeProfesional();
    });
  }

  public setDaysOfAttention(): boolean {
    if (this.anyDaySelected()) {
      if (this.specialitySelected !== (undefined && null)) {
        this.specDays = new SpecialityDays(
          this.speciality,
          this.sunday,
          this.monday,
          this.tuesday,
          this.wednesday,
          this.thursday,
          this.friday,
          this.saturday);

        this.specialitiesDaysList.push(this.specDays);

        this.specDays = null;
        this.speciality = null;
        this.sunday =
          this.monday =
          this.tuesday =
          this.wednesday =
          this.thursday =
          this.friday = false;

        return true;
      }
      else {
        Swal.fire({
          title: 'Atención',
          text: 'Debe elegir una especialidad',
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

  public anyDaySelected(): boolean {
    return this.monday || this.tuesday || this.wednesday || this.thursday || this.friday || this.saturday || this.sunday;
  }


  public getDays(sd: SpecialityDays): string {
    let days: string;
    days = (sd.monday ? 'Lunes - ' : '') +
      (sd.tuesday ? 'Martes - ' : '') +
      (sd.wednesday ? 'Miércoles - ' : '') +
      (sd.thursday ? 'Jueves - ' : '') +
      (sd.friday ? 'Viernes - ' : '');

    console.log(days);
    return 'Especialidad: ' + sd.spec.name + ' - Atiende: ' + days.slice(0, -2);
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

  public haveDays(): boolean {
    return this.specialitiesDaysList.length > 0;
  }

  public changeProfesional() {
    this.profesional = null;
    this.specialitiesDaysList = [];
  }
  public changeSpeciality() {
    this.speciality = null;
  }
}
