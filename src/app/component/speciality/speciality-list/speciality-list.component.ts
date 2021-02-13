import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { SpecialityService } from 'src/app/service/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements OnInit {

  @Output() specialitySelectedOutput: EventEmitter<Speciality> = new EventEmitter<Speciality>();
  @Input() specialityListInput: Array<Speciality>;
  

  constructor(private specialityService: SpecialityService,
              private fireStorage: FireStoreService) {}


  ngOnInit(): void {
    
  }


  selectSpeciality(spec: Speciality) {
    this.specialitySelectedOutput.emit(spec);
  }

  
}
