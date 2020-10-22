import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FireAuthService } from 'src/app/service/fire-auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  user = new User();
  msj: string;

  constructor(private router: Router,
              private fireAuth: FireAuthService) { }

  ngOnInit(): void {
    console.log('Ingreso a registry');
  }

  public register() {
    this.fireAuth.register(this.user);
  }

  public back() {
    this.router.navigate(['/login']);
  }

}
