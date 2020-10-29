import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private userService: UserService) { }
  profesionalSelected: string;
  especialitySelected: string;
  appointmentDate: Date;
  msg: string;
  hourSelected: number;
  minSelected: number;
  profesionaList: Array<User>;


  ngOnInit(): void {
    this.userService.getUsersByProfile('Paciente').subscribe(res =>{
      console.log(res);
      this.profesionaList = res;
    });
  }


  save() {
    console.log('save');
  }

}
