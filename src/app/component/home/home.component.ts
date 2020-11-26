import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private fireAuth: FireAuthService,
              private userService: UserService) { }

  msg: string;
  activeUser;
  email:string;
  profile: string;
  name: string;
  adminActive: boolean;

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
    }).catch(err => {console.log('Error al obtener current user: ' +err)});
  
  }
  public back() {
    this.router.navigate(['/login']);
  }

  public goToProfile()
  {
    switch(this.profile)
    {
      case 'Paciente':
        this.router.navigate(['/patient']);
        break;
      case 'Administrador':
        this.router.navigate(['/admin']);
        break;
      case 'Profesional':
        this.router.navigate(['/profesional']);
        break;
      
    }
  }

  public getAppointment() {
    this.router.navigate(['/patient']);
  }

  public viewAppointments() {
    this.router.navigate(['/patient']);
  }

  public setAttentionDays() {
    this.router.navigate(['/profesional/calendario']);
  }

  public manageAppointments() {
    this.router.navigate['/profesional/appointments']
  }

  public approveProfesional() {
    this.router.navigate(['/admin/approve']);
  }

}
