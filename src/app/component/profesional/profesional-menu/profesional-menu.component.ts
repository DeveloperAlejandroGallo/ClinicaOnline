import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesional-menu',
  templateUrl: './profesional-menu.component.html',
  styleUrls: ['./profesional-menu.component.scss']
})
export class ProfesionalMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public btnNewAppointmentSchedule() {
    this.router.navigate(['']);
  }


  save() {
    
  }

}
