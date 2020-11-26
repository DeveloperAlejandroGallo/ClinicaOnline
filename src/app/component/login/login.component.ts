import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: FireAuthService,
    private fireStore: FireStoreService,
    private usrService: UserService) { }
  // user = new User();
  msg: string;
  email: string;
  pass: string;
  activeUsr: User;

  ngOnInit(): void {
  }
  save(event): void {
    this.btnLogin();
  }

  public register() {
    console.log('Click on registry');
    this.router.navigate(['/registry']);
  }

  public adminLogin() {
    this.email = 'admin@admin.com';
    this.pass = 'administrador';

  }

  public profesionalLogin() {
    this.email = 'profesional@profesional.com';
    this.pass = 'profesional';

  }

  public patientLogin() {
    this.email = 'paciente@paciente.com';
    this.pass = 'paciente';

  }

  public btnLogin(): void {
    // this.email = (document.getElementById('txtUsuario') as HTMLInputElement).value;
    // this.pass = (document.getElementById('txtpass') as HTMLInputElement).value;

    console.log(this.email);
    console.log(this.pass);

    if (this.pass !== '' && this.pass !== undefined) {
      this.authService
        .signIn(this.email, this.pass)
        .then((resp) => {

          this.usrService.getUsersByEmail(this.email).subscribe(res => {
            this.activeUsr = res;
            this.authService.isLoggedIn = true;
            //Check de email verificado para los pacientes
            // if (this.activeUsr.profile == 'Paciente') {
            //   if (resp.user.emailVerified) {
            //     this.router.navigate(['/home']);
            //   } else {
            //     Swal.fire({
            //       title: 'Verificar Email',
            //       text: 'Por favor ingrese a su correo y verifique su email.',
            //       icon: "warning"
            //     });
            //   }
            // } else {
            //   this.router.navigate(['/home']);
            // }
            this.router.navigate(['/home']);
          });
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case 'auth/invalid-email':
              this.msg = 'Correo con formato incorrecto';
              break;
            case 'auth/wrong-password':
              this.msg = 'Clave incorrecta';
              break;
            case 'auth/user-not-found':
              this.msg = 'El usuario no existe.';
              // this.register();
              break;
            default:
              this.msg = error.message;
          }
          Swal.fire({
            title: 'Error',
            text: this.msg,
            icon: "error"
          });
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: this.msg,
        icon: "error"
      });
    }
  }
}
