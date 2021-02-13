import { Component, Input, OnInit } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { AppointmentService } from 'src/app/service/appointment.service';
import { SpecialityService } from 'src/app/service/speciality.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  @Input() specialityRecibed: Speciality;
  @Input() profesionalRecibed: User;

  constructor(private userService: UserService,
              private appointmentService: AppointmentService,
              private specialityService: SpecialityService) { }
  profesionalSelected: string;
  especialitySelected: string;
  appointmentDate: Date;
  msg: string;
  hourSelected: number;
  minSelected: number;
  profesionaList: Array<User>;
  specialityList: Array<Speciality>;


  ngOnInit(): void {
    this.userService.getUsersByProfile('Paciente').subscribe(res =>{
      this.profesionaList = res;
    });

    this.specialityService.getSpecialities().subscribe(res =>{

      this.specialityList =  res;
      console.table(this.specialityList);

    });

  }


  save() {
    // console.log('save');
  }

}
