import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { FireStoreService } from 'src/app/service/fire-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authService: FireAuthService,
              private fireStore: FireStoreService) { }
  user = new User();
  msj: string;

  ngOnInit(): void {
  }
  save(event): void
  {
    this.btnIngresar_Click();
  }

  public register(){
    this.router.navigate(['/registry']);
  }


  public btnIngresar_Click(): void
  {
    // this.user.email = (document.getElementById('txtUsuario') as HTMLInputElement).value;
    // this.user.pass = (document.getElementById('txtpass') as HTMLInputElement).value;

    console.log(this.user.email );
    console.log(this.user.pass );

    if (this.user.pass !== '' && this.user.pass !== undefined) {
      this.authService
        .signIn(this.user)
        .then((resp) => {
          this.msj = 'Bienvenido';
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case 'auth/invalid-email':
              this.msj = 'Correo con formato incorrecto';
              break;
            case 'auth/wrong-password':
              this.msj = 'Clave incorrecta';
              break;
            case 'auth/user-not-found':
              this.msj = 'El usuario no existe.';
              this.register();
              break;
            default:
              this.msj = error.message;
          }
        });
    } else {
      this.msj = 'Por favor ingrese una user.pass';
    }
  }
}
