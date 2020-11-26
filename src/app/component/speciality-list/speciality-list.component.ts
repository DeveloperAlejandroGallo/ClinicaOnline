import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { title } from 'process';
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

  @Output() specialityOutput: EventEmitter<Speciality> = new EventEmitter<Speciality>();

  public specialitiesList: Array<Speciality>;
  public image: string;


  constructor(private specialityService: SpecialityService,
              private fireStorage: FireStoreService) {}
  newSpeciality: Speciality;
  name: string;
  publicURL: string;

  ngOnInit(): void {
    console.info("Iniciando lista de especialidades");
    this.fillSpecialities();
  }

  fillSpecialities() {
    this.specialityService.getSpecialities().subscribe(resp => {

      this.specialitiesList = resp;
      console.log(this.specialitiesList);
    });
  }


  selectSpeciality(spec) {
    this.specialityOutput.emit(spec);
  }

  createSpeciality() {
    console.log('Ingreso a Save');
    if (this.name == ('' || undefined)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un nombre de especialidad',
        icon: 'error'
      });
      return;
    }

    if (this.image == ('' || undefined)) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar una imagen',
        icon: 'error'
      });
      return;
    }

    let refImg;

    let userMetaData = {
      nombre: this.name
    };

    this.fireStorage.uploadFile(this.name, this.image, userMetaData).then(resp => {
      refImg = this.fireStorage.linkToPublicFile(this.name);
      // console.log("refImg" + refImg);
      refImg.getDownloadURL().subscribe((URL) => {
        // console.log("link publico 1: " + URL);
        this.publicURL = URL;
                
        // console.table(this.newSpeciality);
        this.newSpeciality = new Speciality(this.name, this.publicURL);
        this.specialityService.createSpeciality(this.newSpeciality).subscribe((res: any)=>
        {
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title:  this.newSpeciality.name,
            text: 'Creada correctamente.',
            showConfirmButton: false,
            timer: 1500
          })
          this.fillSpecialities();
          this.specialityOutput.emit(this.newSpeciality);
          this.newSpeciality.name = '';
          this.image = '';
        });

      });
    }).catch(err => console.log(err));
  }


  imgUpload(img) {
    this.image = img;
  }
}
