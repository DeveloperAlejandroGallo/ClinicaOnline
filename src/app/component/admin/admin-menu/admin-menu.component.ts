import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speciality } from 'src/app/class/speciality';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { SpecialityService } from 'src/app/service/speciality.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: FireAuthService,
    private userService: UserService,
    private specialityService: SpecialityService) { }

  newSpeciality;
  msg: string;
  activeUser;
  adminActive;
  email: string;
  profile: string;
  name: string;
  speciality: Speciality;

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

  back() {
    this.router.navigate(['/home']);
  }

  save() {
    console.log('Ingreso a Save');
    if (this.newSpeciality == ('' || undefined)) {
      this.msg = 'Debe ingresar un nombre de especialidad';
      return;
    }
    console.log(this.newSpeciality);
    this.speciality = new Speciality(this.newSpeciality);
    this.specialityService.createSpeciality(this.speciality).subscribe((res: any)=>
    {
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title:  this.newSpeciality,
        text: 'Creada correctamente.',
        showConfirmButton: false,
        timer: 2500
      })
      this.newSpeciality = '';
    });
  }
}
