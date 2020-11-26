import { Speciality } from './speciality';
import { User } from './user';

export class Appointment {
    profesional: User;
    speciality: Speciality;
    Date: Date;
    Hour: string;
    Minutes: string;
    DayOfTheWeek: string;
    active: boolean
    patient?: User;
    id?: string;
    patientComment?: string;
    profesionalComment?: string;
    extraData: [{ field: string, value: string}]


    constructor(
        profesional: User,
        speciality: Speciality,
        Date: Date,
        Hour: string,
        Minutes: string,
        DayOfTheWeek: string,
        active: boolean,
        patient?: User,
        id?: string,
        patientComment?: string,
        profesionalComment?: string,
        extraData?: [{ field: string, value: string}]
        ) {
            
            profesional = this.profesional;
            speciality = this.speciality;
            Date = this.Date;
            Hour = this.Hour;
            Minutes = this.Minutes;
            DayOfTheWeek = this.DayOfTheWeek;
            active = this.active;
            patient = this.patient;
            id = this.id;
            patientComment = this.patientComment;
            profesionalComment = this.profesionalComment;
            extraData = this.extraData;

    }

    toJson() {
        return {
            "profesional": this.profesional,
            "speciality": this.speciality,
            "Date": this.Date,
            "Hour": this.Hour,
            "Minutes": this.Minutes,
            "DayOfTheWeek": this.DayOfTheWeek,
            "active": this.active,
            "patient": this.patient,
            "id": this.id,
            "patientComment": this.patientComment,
            "profesionalComment": this.profesional,
            "extraData": this.extraData
        }
    }
}
