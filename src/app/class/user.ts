import { Speciality } from "./speciality";


export class User {
    email: string;
    pass: string;
    name: string;
    lastName: string;
    image1: string;
    image2: string;
    profile: string; // Profesional - Paciente - Administrador
    isActive: boolean;
    specialitiesDays: Array<{ spec: Speciality, 
                              sunday: boolean, 
                              monday: boolean, 
                              tuesday: boolean, 
                              wednesday: boolean, 
                              thursday: boolean, 
                              friday: boolean, 
                              saturday: boolean }>;
    daysAttending?: string[];
    mdLicence?: string;
    approved?: boolean;
    id?: string;

    constructor(
        email: string,
        pass: string,
        name: string,
        lastName: string,
        image1: string,
        profile: string, // Profesional - Paciente - Administrador
        isActive: boolean,
        image2?: string,
        specialitiesDays?: Array<{ spec: Speciality, sunday: boolean, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean }>,
        daysAttending?: string[],
        mdLicence?: string,
        approved?: boolean,
        id?: string) {
        this.email = email;
        this.pass = pass;
        this.name = name;
        this.lastName = lastName;
        this.image1 = image1;
        this.profile = profile; // Profesional - Paciente - Administrador
        this.isActive = isActive;
        if (image2) this.image2 = image2;
        if (specialitiesDays) this.specialitiesDays = specialitiesDays;
        if (daysAttending) this.daysAttending = daysAttending;
        if (mdLicence) this.mdLicence = mdLicence;
        this.approved = approved;
        this.id = id;
    }

    public toJson() {
        return {
            "email": this.email,
            "pass": this.pass,
            "name": this.name,
            "lastName": this.lastName,
            "image1": this.image1,
            "profile": this.profile,  // Profesional - Paciente - Administrador
            "isActive": this.isActive,
            "image2": this.image2,
            "specialitiesDays ": this.specialitiesDays,
            "daysAttending": this.daysAttending,
            "mdLicence ": this.mdLicence,
            "approved": this.approved,
            "id": this.id
        }
    }


}
