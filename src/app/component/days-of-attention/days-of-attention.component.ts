import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality } from 'src/app/class/speciality';
import { SpecialityDays } from 'src/app/class/speciality-days';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-days-of-attention',
  templateUrl: './days-of-attention.component.html',
  styleUrls: ['./days-of-attention.component.scss']
})
export class DaysOfAttentionComponent implements OnInit {

  constructor() { }

  @Input() profesionalInput: User;
  @Input() specialityInput: Speciality;
  @Output() daySelectedOutput: EventEmitter<Date> = new EventEmitter<Date>();

  dayList = Array<Date>();

  ngOnInit(): void {
    this.generateDays();
  }



  public generateDays() {
    const today = new Date();
    const finalDate = new Date(today);
    finalDate.setDate(today.getDate() + 15);
    let occursDate = new Date(today);
    let currentDate = new Date(today);
    // console.log(finalDate);
  
    let specDays: SpecialityDays = this.profesionalInput.specialitiesDays.filter(sd => sd.spec.name == this.specialityInput.name).pop();
    let days = Array<number>();

    if (specDays.monday) days.push(1);
    if (specDays.tuesday) days.push(2);
    if (specDays.wednesday) days.push(3);
    if (specDays.thursday) days.push(4);
    if (specDays.friday) days.push(5);
    // Recorro los proximos 15 días y solo tomo los días de la semana q correspondan a la atención.
    while (currentDate <= new Date(finalDate)) {
      if(days.indexOf(currentDate.getDay()) > -1) {
        this.dayList.push(new Date(currentDate));
    }
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
  
    // console.table(this.dayList);
  }

  public translateDay(day: Date): string {

    let dayOfTheWeek: string;

    switch (day.getDay()) {
      case 0: dayOfTheWeek = 'Domingo'; break;
      case 1: dayOfTheWeek = 'Lunes'; break;
      case 2: dayOfTheWeek = 'Martes'; break;
      case 3: dayOfTheWeek = 'Miércoles'; break;
      case 4: dayOfTheWeek = 'Jueves'; break;
      case 5: dayOfTheWeek = 'Viernes'; break;
      case 6: dayOfTheWeek = 'Sábado'; break;
    }

    return dayOfTheWeek;

  }


  public selectDay(day: Date) {
    this.daySelectedOutput.emit(day);
  }

}