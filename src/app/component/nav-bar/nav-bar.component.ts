import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() usrActivoOutput: EventEmitter<User> = new EventEmitter<User>();

  usuarioActivo;
  usuario: User;

  constructor(private router:Router,
              public authService:FireAuthService,
              private usuarioService: UserService) {
  }
  
  ngOnInit(): void {
    this.authService.currentUser().then(resp=>{
      this.usuarioActivo=resp;
      // console.log('usuarioActivo ' + this.usuarioActivo.email);
    
      this.usuarioService.getUsersByEmail(this.usuarioActivo.email).subscribe(ret => {
        this.usuario = ret;
        // console.log('Usr: ');
        // console.table(this.usuario);
        this.usrActivoOutput.emit(this.usuario);
      });
  
    });
  }

  cerrarSesion(){
    this.authService.closeSesion().then( resp =>{
      this.usuarioActivo=null;
      this.authService.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }



  
}
