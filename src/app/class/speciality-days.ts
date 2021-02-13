import { Speciality } from './speciality';

export class SpecialityDays {
    spec: Speciality;
    sunday: boolean;
    monday: boolean;
    // mondayHourFrom: string;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;

    constructor(spec: Speciality,
        sunday: boolean,
        monday: boolean,
        tuesday: boolean,
        wednesday: boolean,
        thursday: boolean,
        friday: boolean,
        saturday: boolean,) { 
            
        this.spec = spec;
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;

        }

}
