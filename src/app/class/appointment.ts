import { Speciality } from './speciality';
import { User } from './user';

export class Appointment {
    profesional: User;
    speciality: Speciality;
    Date: Date;
    Hour: string;
    // Minutes: string;
    DayOfTheWeek: string;
    active: boolean;
    attended: boolean;
    patient?: User;
    id?: string;
    patientComment?: string;
    profesionalComment?: string;
    extraData?: [{ field: string, value: string}];


    constructor(
        profesional: User,
        speciality: Speciality,
        Date: Date,
        Hour: string,
        // Minutes: string,
        DayOfTheWeek: string,
        active: boolean,
        attended: boolean,
        patient?: User,
        id?: string,
        patientComment?: string,
        profesionalComment?: string,
        extraData?: [{ field: string, value: string}]
        ) {
            this.profesional = profesional;
            this.speciality = speciality;
            this.Date = Date;
            this.Hour = Hour;
            // Minutes = this.Minutes;
            this.DayOfTheWeek = DayOfTheWeek;
            this.active = active;
            this.attended = attended;
            this.patient = patient;
            this.id = id;
            this.patientComment = patientComment;
            this.profesionalComment = profesionalComment;
            this.extraData = extraData;

    }

    toJson() {
        return {
            "profesional": this.profesional,
            "speciality": this.speciality,
            "Date": this.Date,
            "Hour": this.Hour,
            // "Minutes": this.Minutes,
            "DayOfTheWeek": this.DayOfTheWeek,
            "active": this.active,
            "attended": this.attended,
            "patient": this.patient,
            "id": this.id,
            "patientComment": this.patientComment,
            "profesionalComment": this.profesional,
            "extraData": this.extraData
        }
    }
}
