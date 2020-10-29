import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  public user = new User();
  public msj: string;
  public img1;
  public img2;
  public publicURL1;
  public publicURL2;
  public radioChk;
  public usuarioActivo;
  public adminActivo;
  public formRegistro: FormGroup;
  public myRecaptcha:boolean=false;

  onScriptLoad(){
    console.log("Load captcha");
  }

  onScriptError(){
    console.log("Error captcha");
  }

  resolved(captchaResponse: string, res) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  constructor(private router: Router,
              private fireAuth: FireAuthService,
              private fireStorage: FireStoreService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User();
    console.log('Ingreso a registry');
    // this.user.image1 = '../../../assets/images/icons/avatar_female1.png';
    // this.user.image2 = '../../../assets/images/icons/avatar_male1.png';

    this.user.profile = "Paciente";

    // this.fireAuth.currentUser().then(resp => {

    // this.usuarioActivo = resp;

    // this.userService.getUsersByEmail(this.usuarioActivo.email).subscribe(res => {
    //   if (res.tipoDeUsuario == "Administrador")
    //     this.adminActivo = true;
    //   });
    // });
  }

  private incompleteFields()
  {

    if (this.user.profile == ('' || undefined)) {
      this.msj = 'Debe seleccionar un tipo de usuario.'
      return true;
    }
    if (this.user.name == ('' || undefined)) {
      this.msj = 'Por favor ingrese su nombre completo.'
      return true;
    }
    if (this.user.email == ('' || undefined)) {
      this.msj = 'Porf favor ingrese un correo v\u00E1lido.'
      return true;
    }
    if (this.user.pass == ('' || undefined) || this.user.pass.length < 6) {
      this.msj = 'Debe ingresar una clave de 6 digitos.'
      return true;
    }
    // if (!this.myRecaptcha) {
    //   this.msj = 'Debe validar el Captcha.'
    //   return true;
    // }

    return false;
  }


  public register() {
    // this.fireAuth.register(this.user);

    if (this.incompleteFields())
      return;

    this.fireAuth.register(this.user).then(res => {
      console.log(res);
      res.user.sendEmailVerification({
        handleCodeInApp: true,
        url: environment.urlVerify
      })
      this.msj = 'Registro exitoso. Bienvenido ' + this.user.email;
      // this.router.navigate(['/login']);

    }).catch(error => {
      console.log(error);
      switch (error.code)
      {
        case 'auth/weak-password':
          this.msj = 'La clave debe poseer al menos 6 caracteres';
          break;
        case 'auth/email-already-in-use':
          this.msj = 'Correo ya registrado';
          break;
          case 'auth/invalid-email':
            this.msj = 'Correo con formato inv\u00E1lido';
            break;
          case 'auth/argument-error':
            if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')
              this.msj = 'Correo con debe ser una cadena v\u00E1lida';
            else
              this.msj = 'La constrase\u00F1a debe ser una cadena v\u00E1lida';
            break;
          case 'auth/argument-error':
            this.msj = 'Correo con debe ser una cadena v\u00E1lida';
            break;
          default:
            this.msj = 'Error en registro';
      }
      return;
    });

    let refImg1, refImg2;

    let userMetaData = {
      nombre: this.user.name,
      email: this.user.email,
      perfil: this.user.profile
    };

    this.fireStorage.uploadFile(this.user.email + "_1", this.user.image1,userMetaData).then(resp => {
      refImg1 = this.fireStorage.linkToPublicFile(this.user.email + "_1");
      console.log("refImg1" + refImg1);
      refImg1.getDownloadURL().subscribe((URL) => {
        console.log("link publico 1: " + URL);
        this.publicURL1 = URL;
      });
    }).catch(error => {console.log("Error al subir img " + error)});

    // this.fireStorage.uploadFile(this.user.email + "_2", this.img1,userMetaData).then(resp => {
    //   refImg2 = this.fireStorage.linkToPublicFile(this.user.email + "_2");
    //   refImg2.getDownloadURL().subscribe((URL) => {
    //     console.log("link publico 2" + URL);
    //     this.publicURL1 = URL;
    //   });
    // });



  }

  public back() {
    this.router.navigate(['/login']);
  }

  public assignImg(src: string) {
    console.log('img cliequeada ' + src)
  
  }

  imgUpload1(img) {
    this.user.image1 = img;
  }

  imgUpload2(img) {
    this.user.image2 = img;
  }


}
