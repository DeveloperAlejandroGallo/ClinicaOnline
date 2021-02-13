import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/service/user.service';
import { FilterUserPipe } from "src/app/pipes/filter-user.pipe";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() filterTypeInput: string;
  @Input() filterValueInput: string;
  @Input() profileInput: string;
  @Output() userOutput: EventEmitter<User> = new EventEmitter<User>();
  @Output() userListOutput: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  
  constructor(private userService: UserService) {
    this.getUsers();
   }
  
  userList = Array<User>();
  tableTitle: string;

  ngOnInit(): void {
    this.getUsers();

    switch(this.profileInput) {
      case 'Profesional':
        this.tableTitle = 'Profesionales';
        break;
      case 'Paciente':
        this.tableTitle = 'Pacientes';
        break;
      case 'Administrador':
        this.tableTitle = 'Administradores';
        break;

    }


  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      // console.log(res);
      this.userList = res;
      this.userListOutput.emit(this.userList);
    });
  }

  public selectUser(usr) {
    this.userOutput.emit(usr);
  }

  

}
