import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../class/appointment';

@Pipe({
  name: 'filterAppointment'
})
export class FilterAppointmentPipe implements PipeTransform {

  transform(value: Array<Appointment>, ...args: string[]): Array<Appointment> {
    
    let appointmenList: Array<Appointment>;
    let filter: string = args[0] == (null || undefined) ? '' : args[0];
    let profile: string = args[1];
    let email: string = args[2];

    appointmenList = value.filter(elem => 
      elem.patient.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.patient.lastName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.lastName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.specialitiesDays.some(s => s.spec.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ) || 
      elem.patientComment.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesionalComment.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.extraData.some(extra => extra.field.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                                   extra.value.toLowerCase().indexOf(filter.toLowerCase()) > -1) 
      );
    
    switch(profile) {
      case 'Administrador':
      break;
      case 'Paciente':
        appointmenList = appointmenList.filter(a => a.patient.email = email);
        break;
      case 'profesional':
        appointmenList = appointmenList.filter(a => a.profesional.email = email);
        break;
    }
    
    return appointmenList;
  }
}
