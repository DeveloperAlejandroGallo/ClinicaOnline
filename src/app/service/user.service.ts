import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from "@angular/common/http";
import { User } from '../class/user';
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList;


  constructor(private fireUsers:AngularFireDatabase, private http:HttpClient) {
    
    this.userList= fireUsers.object('usuarios').valueChanges().pipe(map(datos=>{return this.objecToArray(datos)}));

   }

   altaUsuario(user:User){
     
     return this.http.post(environment.firebase.databaseURL+"/usuarios.json",user);
     

  }

  getUsers(){
    return this.userList;
  }

  getUsersByEmail(email:string){
    // Antes de devolver la info a la que me suscribo, paso por el map
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterByEmail(resp,email)}));
  }

  getUsersByProfile(profile:string){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterByProfile(resp,profile)}));
  }

  getUsuarioById(id:string){
    return this.http.get(environment.firebase.databaseURL+"/usuarios.json").pipe(map(resp=>{
      return this.filterById(resp,id)}));
  }

  changeUserState(id:string,state:boolean){
    return this.http.patch(environment.firebase.databaseURL+"/usuarios/"+id+".json",{estado:state}).subscribe(resp=>{
    });    
  }


public filterByEmail(res: any, email: string) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.email == email) {
        aux = element;
      }
    }
    return aux;
}

public filterById(res: any, id: string) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.id == id) {
        aux = element;
      }
    }
    return aux;
}

public filterByProfile(res: any, profile: string) {
  let usuarios;
  let aux=null;
  usuarios=this.objecToArray(res);
    for (let index = 0; index < usuarios.length; index++) {
      const element = usuarios[index];
      if (element.profile == profile) {
        aux = element;
      }
    }
    return aux;
}



/****Generic Function */

  private objecToArray( datos: Object ){
    const users = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
          let user: any = datos[key];
          user.id=key;
          users.push(user);
        
    })
    return users;
  }

}