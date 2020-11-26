import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../class/appointment';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<Appointment>, ...args: string[]): Array<Appointment> {
    
    let appointmenList: Array<Appointment>;
    let filter: string = args[0];

    appointmenList = value.filter(elem => 
      elem.patient.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.patient.lastName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.lastName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesional.specialitiesDays.some(s => s.spec.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ) || //.spec.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.patientComment.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.profesionalComment.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      elem.extraData.some(extra => extra.field.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                                   extra.value.toLowerCase().indexOf(filter.toLowerCase()) > -1) 
      );
    
    
    
    return appointmenList;
  }

}
