import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/class/appointment';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: FireAuthService,
    private userService: UserService,
    private appointServ: AppointmentService) { }

  msg: string;
  activeUser;
  email: string;
  profile: string;
  name: string;
  adminActive: boolean;
  menu = 0;
  patient: User;
  speciality: Speciality;
  profesional: User;
  date: Date;
  dateFormated: string;
  hour: string;

  appointment: Appointment;

  ngOnInit(): void {
  
  }

  public back() {
    this.router.navigate(['/home']);
  }

  public getAppointment() {
    
    try {
      console.log('Ingreso');
      this.appointment =  new Appointment(this.profesional,this.speciality,this.date, this.hour, this.translateDay(this.date), 
                          true, false, this.patient);
      console.log('Luego del new');
    } catch {
      console.log('catch');
    }
    console.table(this.appointment);
    this.appointServ.createAppointment(this.appointment).subscribe(r => {
      Swal.fire({
        title: 'Turno',
        text: 'Generado correctamente',
        icon: 'success'
      }).then(re=>{
        this.btnChangeSpeciality();
      });
    });
  }

  public specialitySelected(): boolean {
    return this.speciality != (undefined && '' && null);
  }
  public profesionalSelected(): boolean {
    return this.profesional != (undefined && '' && null);
  }
  public dateSelected(): boolean {
    return this.date != (undefined && '' && null);
  }
  public hourSelected(): boolean {
    return this.hour != (undefined && '' && null);
  }

  public btnChangeSpeciality() {
    this.speciality = null;
    this.btnChangeProfesional();
  }
  public btnChangeProfesional() {
    this.profesional = null;
    this.btnChangeDate();
  }
  public btnChangeDate() {
    this.date = null;
    this.dateFormated='';
    this.btnChangeHour();
  }
  public btnChangeHour() {
    this.hour = null;
  }

  public recievePatient(p: User) {
    this.patient = p;
  }

  public recieveSpeciality(e)  {
    this.speciality = e;
    console.table(this.speciality);
  }
  public recieveProfesional(e)  {
    this.profesional = e;
    console.table(this.profesional);
  }
  public recieveDay(date: Date) {
    this.date = date;
    this.dateFormated = date.getUTCDate().toString() + '/' + (date.getUTCMonth() + 1).toString() + '/' + date.getUTCFullYear().toString();
    console.log(this.date);
  }
  public recieveHour(h: string)  {
    this.hour = h;
    console.log(this.hour);
  }

  // public getUser(usr: User) {
  //   this.profesional = usr;
  // }

  public translateDay(day: Date): string {

    let dayOfTheWeek: string;

    switch (day.getDay()) {
      case 0: dayOfTheWeek = 'Domingo'; break;
      case 1: dayOfTheWeek = 'Lunes'; break;
      case 2: dayOfTheWeek = 'Martes'; break;
      case 3: dayOfTheWeek = 'Miércoles'; break;
      case 4: dayOfTheWeek = 'Jueves'; break;
      case 5: dayOfTheWeek = 'Viernes'; break;
      case 6: dayOfTheWeek = 'Sábado'; break;
    }

    return dayOfTheWeek;

  }

}
