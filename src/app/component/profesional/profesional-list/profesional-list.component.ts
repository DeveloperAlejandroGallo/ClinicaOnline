import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-profesional-list',
  templateUrl: './profesional-list.component.html',
  styleUrls: ['./profesional-list.component.scss']
})
export class ProfesionalListComponent implements OnInit {

  @Input() specialityInput: Speciality;
  @Output() profesionalOutput: EventEmitter<User> = new EventEmitter<User>();
  @Output() profesionalListOutput: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  constructor(private userService: UserService) { }
  
  profesionalList: Array<User>;


  ngOnInit(): void {
    console.log('specialityInput: '+ this.specialityInput);
    this.userService.getUsersByProfile('Profesional').subscribe(res => {
      console.log(res);
      this.profesionalList = res;
      this.profesionalListOutput.emit(this.profesionalList);
    });
  }

  public selectProfesional(prof) {
    this.profesionalOutput.emit(prof);
  }


}
