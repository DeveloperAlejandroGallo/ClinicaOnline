import { userError } from '@angular/compiler-cli/src/transformers/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/class/appointment';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appServ: AppointmentService,
    private authService: FireAuthService,
    private usuarioService: UserService) {

    this.authService.currentUser().then(resp => {
      this.usuarioActivo = resp;
      console.log('usuarioActivo ' + this.usuarioActivo.email);

      this.usuarioService.getUsersByEmail(this.usuarioActivo.email).subscribe(ret => {
        this.usuario = ret;

      });

    });


    this.appServ.getAppointment().subscribe(r => {
      this.appointmentList = r;
    });
  }

  @Output() appointmentOutput: EventEmitter<Appointment> = new EventEmitter<Appointment>();
  @Input() filterInput: string = '';
  // @Input() userInput: User;

  usuarioActivo;
  usuario: User;
  appointmentList = new Array<Appointment>();

  ngOnInit(): void {




  }


  selectAppointment(ap: Appointment) {
    this.appointmentOutput.emit(ap);
  }

}
