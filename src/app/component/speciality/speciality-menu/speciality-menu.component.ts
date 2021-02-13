import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { SpecialityDays } from 'src/app/class/speciality-days';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { SpecialityService } from 'src/app/service/speciality.service';

@Component({
  selector: 'app-speciality-menu',
  templateUrl: './speciality-menu.component.html',
  styleUrls: ['./speciality-menu.component.scss']
})
export class SpecialityMenuComponent implements OnInit {

  @Output() specialityOutputList: EventEmitter<Array<Speciality>> =  new EventEmitter<Array<Speciality>>();
  @Output() specialityOutput: EventEmitter<Speciality> = new EventEmitter<Speciality>();
  @Input() specialitySelected: Speciality;
  @Input() showAddInput: boolean;
  @Input() filter: string;
  specialitiesList: Array<Speciality> = new Array<Speciality>();

  constructor(private specialityService: SpecialityService,
    private fireStorage: FireStoreService) { }

  ngOnInit(): void {
    console.info("Iniciando lista de especialidades");
    this.fillSpecialities();
  }

  fillSpecialities() {
    this.specialityService.getSpecialities().subscribe(resp => {

      this.specialitiesList = resp;
      // console.log(this.specialitiesList);
    });
  }

  recibeSpeciality(spec: Speciality){
    this.specialityOutput.emit(spec);
  }

}
