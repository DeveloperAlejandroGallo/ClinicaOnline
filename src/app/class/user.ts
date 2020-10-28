import { Speciality } from "src/app/class/speciality";


export class User {
    id: string;
    email: string;
    pass: string;
    name: string;
    image1: string;
    image2: string;
    profile: string; // Profesional - Paciente - Administrador
    birth: Date;
    specialities: Speciality[]; 
    days: string[];
    state: boolean;
}
