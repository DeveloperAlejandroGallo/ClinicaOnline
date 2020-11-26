import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Appointment } from 'src/app/class/appointment';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-profesional-appointment',
  templateUrl: './profesional-appointment.component.html',
  styleUrls: ['./profesional-appointment.component.scss']
})
export class ProfesionalAppointmentComponent implements OnInit {

  constructor(private fireAuth: FireAuthService,
              private userService: UserService,
              private appointmentService: AppointmentService) { }

  activeUser;
  email:string;
  profile:string;
  adminActive: boolean;
  name: string;
  speciality: Speciality;
  profesional: User;
  msg: string;
  hourSelected: string;
  minSelected: string;
  appointmentDate: Date;
  appointment: Appointment;
  

  ngOnInit(): void {
    this.fireAuth.currentUser().then(resp => {

      this.activeUser =resp;

      this.userService.getUsersByEmail(this.activeUser.email).subscribe(res => {
        if (res.profile == "Administrador")
          this.adminActive = true;
        this.profesional = res;

      });
    }).catch(err => { console.log('Error al obtener current user en patient-menu: ' + err) });
  }

  save() {
    // this.appointment = new Appointment(this.activeUser, this.activeUser.speciality,this.appointmentDate, this.hourSelected,
    //   this.minSelected, this.getDayofTheWeek(),true,);

      // this.appointmentService.createAppointment(this.appointment).subscribe((res: any) => );
  }

    public getDayofTheWeek(): string {
      
      let weekDay: string;
      switch(this.appointmentDate.getDay())
      {
        case 0: weekDay = 'Domingo'; break;
        case 1: weekDay = 'Lunes'; break;
        case 2: weekDay = 'Martes'; break;
        case 3: weekDay = 'Miércoles'; break;
        case 4: weekDay = 'Jueves'; break;
        case 5: weekDay = 'Viernes'; break;
        case 6: weekDay = 'Sábado'; break;
      }
      return weekDay;
    }


}
