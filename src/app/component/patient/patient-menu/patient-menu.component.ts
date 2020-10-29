import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    }).catch(err => { console.log('Error al obtener current user: ' + err) });

  }

  back() {
    this.router.navigate(['/home']);
  }

  menuSelector(wich:string) {
    if(wich == 'turno') this.menu = 1;
    if(wich == 'datos') this.menu = 2;
  } 
}
