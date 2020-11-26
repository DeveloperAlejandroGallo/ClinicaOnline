import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/class/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

    constructor() { }

    @Output() appointmentOutput: EventEmitter<Appointment> = new EventEmitter<Appointment>();
    @Input() filter: string;
    
    appointmentList = new Array<Appointment>();

  ngOnInit(): void {
  }


  selectAppointment(ap: Appointment) {
    this.appointmentOutput.emit(ap);
  }

}
