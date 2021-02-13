import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { app } from 'firebase';
import { Appointment } from 'src/app/class/appointment';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss']
})
export class HoursComponent implements OnInit {

  constructor(private appServ: AppointmentService) { }

  @Input() profesionalInput: User;
  @Input() specialityInput: Speciality;
  @Input() dayInput: Date;
  @Output() hourSelectedOutput: EventEmitter<string> = new EventEmitter<string>();

  hourList = Array<string>();
  appointmentList = Array<Appointment>();

  ngOnInit(): void {
    this.appServ.getAppointment().subscribe(r => {
      this.appointmentList = r;
    });
    this.generateHours();
  }

  public generateHours() {
    this.hourList = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30'
    ];

    if (this.appointmentList && this.appointmentList.length > 0) {
      let appByDoctorAndSpeciality: Array<Appointment> = this.appointmentList.filter(a =>
        a.profesional.email == this.profesionalInput.email &&
        a.speciality.name == this.specialityInput.name &&
        a.Date == this.dayInput
      );

      for (let i = 0; i < appByDoctorAndSpeciality.length; i++) {
        if (this.hourList.indexOf(appByDoctorAndSpeciality[i].Hour) > -1) {
          let index = this.hourList.indexOf(appByDoctorAndSpeciality[i].Hour);
          this.hourList.splice(index, index);
        }
      }
    }
  }

  public selectHour(h: string) {
    this.hourSelectedOutput.emit(h);
  }




}
