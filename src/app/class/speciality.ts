export class Speciality {
    name:string;
    image?: string;
    id?:string;

    constructor(name:string, image?: string, id?: string) {
        this.name=name;
        this.image=image;
        this.id= id;
    }

    public toJson() {
        return{
            "name": this.name,
            "image": this.image,
            "id": this.id
        }
    }
}
