import { Speciality } from "./speciality";


export class User {
    // id: string;
    email: string;
    pass: string;
    name: string;
    image1: string;
    image2: string;
    profile: string; // Profesional - Paciente - Administrador
    birth: Date;
    active: boolean;
    specialities?: Speciality[]; 
    daysAttending: string[];
    mdLicence: string;

    constructor(
        // id: string,
        email: string,
        pass: string,
        name: string,
        image1: string,
        profile: string, // Profesional - Paciente - Administrador
        birth: Date,
        active: boolean,
        image2?: string,
        specialities?: Speciality[], 
        daysAttending?: string[],
        mdLicence?: string)
    {
        // this.id=id,
        this.email=email;
        this.pass=pass;
        this.name=name;
        this.image1=image1;
        this.profile=profile; // Profesional - Paciente - Administrador
        this.birth=birth;
        this.active=active;
        if(image2)this.image2=image2;
        if(specialities)this.specialities=specialities; 
        if(daysAttending)this.daysAttending=daysAttending;
        if(mdLicence)this.mdLicence=mdLicence; 
    }
}
