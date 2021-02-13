import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/class/appointment';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {

  constructor() { }
  @Input() appointmentInput: Appointment;

  ngOnInit(): void {

  }


  save() {
    // let appointment = new Appointment(this.activeUser, this.activeUser.speciality,this.appointmentDate, this.hourSelected,
    //   this.minSelected, this.getDayofTheWeek(),true,);

    // this.appointmentService.createAppointment(this.appointment).subscribe((res: any) => );
  }

  public appointmentSelected() {
    return this.appointmentInput != (null && undefined)
  }

  public reject() {

  }


}
