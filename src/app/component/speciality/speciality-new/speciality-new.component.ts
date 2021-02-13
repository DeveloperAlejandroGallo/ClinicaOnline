import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { FireStoreService } from 'src/app/service/fire-store.service';
import { SpecialityService } from 'src/app/service/speciality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speciality-new',
  templateUrl: './speciality-new.component.html',
  styleUrls: ['./speciality-new.component.scss']
})
export class SpecialityNewComponent implements OnInit {

  @Output() specialityCratedOut: EventEmitter<Speciality> = new EventEmitter<Speciality>();

  public image: string;
  
  constructor(private specialityService: SpecialityService,
    private fireStorage: FireStoreService) { }

  ngOnInit(): void {
  }

  newSpeciality: Speciality;
  name: string;
  publicURL: string;


  selectSpeciality(spec: Speciality) {
    this.specialityCratedOut.emit(spec);
  }

  createSpeciality() {
    // console.log('Ingreso a Save');
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
          this.selectSpeciality(this.newSpeciality);
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title:  this.newSpeciality.name,
            text: 'Creada correctamente.',
            showConfirmButton: false,
            timer: 1500
          });
          // this.fillSpecialities();
          this.name = '';
          this.image = '';
        });

      });
    }).catch(err => console.error('Error al subir imagen: '+err));
  }


  imgUpload(img) {
    this.image = img;
  }

}
