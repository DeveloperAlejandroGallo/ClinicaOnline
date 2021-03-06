import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";
import { Speciality } from 'src/app/class/speciality';
import { SpecialityService } from 'src/app/service/speciality.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  constructor(private router: Router,
    private fireAuth: FireAuthService,
    private fireStorage: FireStoreService,
    private userService: UserService,
    private specialityService: SpecialityService) { }

  // @Output() newSpecialityOutput: EventEmitter<Speciality> = new EventEmitter<Speciality>();


  public user: User;
  public msg: string;
  public publicURL1;
  public publicURL2;
  public userActive;
  public adminActive;

  public myRecaptcha: boolean = false;

  public email: string;
  public pass: string;
  public name: string;
  public lastName: string;
  public image1: string;
  public profile: string; // Profesional - Paciente - Administrador
  public birth: Date;
  public active: boolean;
  public image2: string;
  public specialities: Speciality[];
  public daysAttending: string[];
  public mdLicence: string;

  public specialityList: Array<Speciality>;
  public specialitySelected: Speciality;

  public chkDisableCapcha: boolean;

  ngOnInit(): void {
    // this.user = new User();
    // console.log('Ingreso a registry');
    // this.image1 = '../../../assets/images/icons/avatar_female1.png';
    // this.image2 = '../../../assets/images/icons/avatar_male1.png';

    this.profile = "Paciente";

    this.fireAuth.currentUser().then(resp => {

      this.userActive = resp;

      this.userService.getUsersByEmail(this.userActive.email).subscribe(res => {
        if (res.profile == "Administrador")
          this.adminActive = true;
      });
    }).catch(err => { console.error('Error al obtener current user: ' + err) });

    this.specialityService.getSpecialities().subscribe(res => {

      this.specialityList = res;
      console.table(this.specialityList);

    });




  }

  // reCaptcha
  onScriptLoad() {
    // console.log("Load captcha");
  }

  onScriptError() {
    console.error("Error captcha");
  }

  resolved(captchaResponse: string, res) {
    // console.log(`Resolved response token: ${captchaResponse}`);
  }


  public recibeSpeciality(spec: Speciality) {
    this.specialitySelected = spec;
  }

  generateAppointments() {

  }

  public register() {
    // this.fireAuth.register(this.user);

    if (this.incompleteFields()) {
      Swal.fire({
        title: "Error",
        text: this.msg,
        icon: "error"
      });
    } else {

      this.fireAuth.register(this.email, this.pass).then(res => {
        // console.log('registrando: ');
        console.table(res);
        res.user.sendEmailVerification({
           handleCodeInApp: true,
           url: environment.urlVerify
          })
      }).catch(error => {
        console.error(error);
        switch (error.code) {
          case 'auth/weak-password':
            this.msg = 'La clave debe poseer al menos 6 caracteres';
            break;
          case 'auth/email-already-in-use':
            this.msg = 'Correo ya registrado';
            break;
          case 'auth/invalid-email':
            this.msg = 'Correo con formato inv\u00E1lido';
            break;
          case 'auth/argument-error':
            if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.')
              this.msg = 'Correo con debe ser una cadena v\u00E1lida';
            else
              this.msg = 'La constrase\u00F1a debe ser una cadena v\u00E1lida';
            break;
          case 'auth/argument-error':
            this.msg = 'Correo con debe ser una cadena v\u00E1lida';
            break;
          default:
            this.msg = 'Error en registro';
        }
        return;
      });

      let refImg1, refImg2;

      let userMetaData = {
        nombre: this.name,
        email: this.email,
        perfil: this.profile
      };

      this.fireStorage.uploadFile(this.email + "_1", this.image1, userMetaData).then(resp => {
        refImg1 = this.fireStorage.linkToPublicFile(this.email + "_1");
        // console.log("refImg1" + refImg1);
        refImg1.getDownloadURL().subscribe((URL) => {
          // console.log("link publico 1: " + URL);
          this.publicURL1 = URL;

          if (this.profile == 'Paciente') {
            this.fireStorage.uploadFile(this.email + "_2", this.image2, userMetaData).then(resp => {
              refImg2 = this.fireStorage.linkToPublicFile(this.email + "_2");
              refImg2.getDownloadURL().subscribe((URL) => {
                // console.log("link publico 2" + URL);
                this.publicURL2 = URL;

                this.user = new User(this.email, this.pass, this.name, this.lastName, this.publicURL1, this.profile, true, this.publicURL2);

                this.userService.createUser(this.user).subscribe((res: any) => {
                  Swal.fire({
                    title: "Bienvenido",
                    text: "Registro exitoso.\nDirijase a su casilla de correo para verificar su email.",
                    icon: "info"
                  }).then(r => {
                    // console.log('User Registered - Type: ' + this.profile)
                    this.CleanFields();
                  });
                });
              });
            }).catch(err => { console.error("Error al subir img 2 - " + err) });
          }
          else {
            //Profesional
            this.user = new User(this.email, this.pass, this.name, this.lastName, this.publicURL1, this.profile,
              true, '', null, null, this.mdLicence, false);

            this.userService.createUser(this.user).subscribe((res: any) => {
              Swal.fire({
                title: "Bienvenido",
                text: "Registro exitoso.\nUna vez que aprueben su ingreso podrá atender.",
                icon: "info"
              }).then(r => {
                // console.log('User Registered - Type: ' + this.profile)
                this.CleanFields();
              });
            });
          }
        });
      }).catch(error => { console.error("Error al subir img 1" + error) });
    }
  }

  private CleanFields() {
    this.user = null;

    this.publicURL1 = '';
    this.publicURL2 = '';

    this.myRecaptcha = false;

    this.email = '';
    this.pass = '';
    this.name = '';
    this.lastName = '';
    this.image1 = '';
    this.image2 = '';
    this.profile = ''; // Profesional - Paciente - Administrador

    this.daysAttending = [];
    this.mdLicence = '';

    this.specialitySelected = null;
    this.msg = '';
  }

  private incompleteFields() {

    if (this.profile == ('' || undefined)) {
      this.msg = 'Debe seleccionar un tipo de usuario.'
      return true;
    }
    if (this.name == ('' || undefined)) {
      this.msg = 'Por favor ingrese su nombre.'
      return true;
    }
    if (this.lastName == ('' || undefined)) {
      this.msg = 'Por favor ingrese su apellido.'
      return true;
    }
    if (this.email == ('' || undefined)) {
      this.msg = 'Porf favor ingrese un correo v\u00E1lido.'
      return true;
    }
    if (this.pass == ('' || undefined) || this.pass.length < 6) {
      this.msg = 'Debe ingresar una clave de 6 digitos.'
      return true;
    }
    if (this.image1 == ('' || undefined)) {
      this.msg = 'Debe ingresar una imagen';
    }
    if (this.profile == 'Paciente' && this.image2 == ('' || undefined)) {
      this.msg = 'Debe ingresar una segunda imagen por ser profesional.';
    }
    if (this.profile == 'Profesional' && this.mdLicence == ('' || undefined)) {
      this.msg = 'Debe ingresar un de licencia profesional.';
    }
    // console.log('myRecaptcha: ' + this.myRecaptcha)
    if (!this.myRecaptcha && !this.chkDisableCapcha) {
      this.msg = 'Debe validar el Captcha.'
      return true;
    }
    return false;
  }

  public back() {
    this.router.navigate(['/login']);
  }

  public assignImg(src: string) {
    // console.log('img cliequeada ' + src)

  }

  imgUpload1(img) {
    this.image1 = img;
  }

  imgUpload2(img) {
    this.image2 = img;
  }


}
