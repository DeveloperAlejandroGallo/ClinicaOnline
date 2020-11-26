import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speciality } from 'src/app/class/speciality';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: FireAuthService,
    private userService: UserService) { }

  msg: string;
  activeUser;
  email: string;
  profile: string;
  name: string;
  adminActive: boolean;
  menu = 0;

  speciality: Speciality;
  profesional: User;
  date;


  ngOnInit(): void {
    this.fireAuth.currentUser().then(resp => {

      this.activeUser = resp;

      this.userService.getUsersByEmail(this.activeUser.email).subscribe(res => {
        if (res.profile == "Administrador")
          this.adminActive = true;

        this.email = res.email;
        this.profile = res.profile;
        this.name = res.name;
      });
    }).catch(err => { console.log('Error al obtener current user en patient-menu: ' + err) });

  }

  public back() {
    this.router.navigate(['/home']);
  }

  public menuSelector(wich:string) {
    if(wich == 'turno') this.menu = 1;
    if(wich == 'datos') this.menu = 2;
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

  public btnChangeSpeciality() {
    this.speciality = null;
    this.profesional = null;
    this.date = null;
  }
  public btnChangeProfesional() {
    this.profesional = null;
    this.date = null;
  }
  public btnChangeDate() {
    this.date = null;
  }

  public recibeSpeciality(e)  {
    console.log('recibeSpeciality:' + e.name)
    this.speciality = e;
  }
  public recibeProfesional(e)  {
    this.profesional = e;
  }
}
