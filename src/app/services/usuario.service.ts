import { Injectable } from '@angular/core';
import  { Usuario, ModificarUsuario, UsuarioaModificar } from '../models/usuario';
import  { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import  { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

myAppUrl: string;
myApiUrl: string;

  constructor(private http: HttpClient) {
  	this.myAppUrl = environment.endpoint;
  	this.myApiUrl = '/api/usuario';

   }

   public usuarioSeleccionado : ModificarUsuario = {
     id:'',
     usuarioUsuario: '',
     passwordUsuario: '',
     nombreUsuario: '',
     correoUsuario: '',
     rolUsuario: ''    
   };

   // 'http://localhost:60036/api/usuario' -- POST
  saveUser(usuario: Usuario): Observable<any>{
     return this.http.post(this.myAppUrl + this.myApiUrl, usuario);

  }

  cambiarPassword(changePassword: any): Observable<any>{
  	return this.http.put(this.myAppUrl + this.myApiUrl+ '/CambiarPassword', changePassword);
  }

    getListUsers(): Observable<any>{
    return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaUsuariosUsuarios');

  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl+'/'+ id);
  }

  editUser(id: number, usuarioEditado: UsuarioaModificar): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id , usuarioEditado );
  }

}
