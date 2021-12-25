import { Injectable } from '@angular/core';
import  { usuarioLogin, UserModel } from '../models/usuarioLogin';
import  { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import  { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userRole!: string;

	myAppUrl: string;
	myApiUrl: string;

  constructor(private http: HttpClient) {
  	this.myAppUrl = environment.endpoint;
  	this.myApiUrl = '/api/login'; 
   }

   login(usuario: usuarioLogin ): Observable<any>{
   	return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
   }

   // ésta funcion nos guadara el usuario en localStorage el que se acaba de loguear. 
   setLocalStorage(data: any):void{
   	localStorage.setItem('token', data);
   }

   //esta funcion no permitira adquirir el nombre desde el localStorage
   getUsuario(): any{
     return localStorage.getItem('usuarioUsuario');
   }

   getTokenDecoded(): any {
     const helper = new JwtHelperService();
     const decodedToken = helper.decodeToken(localStorage.getItem('token')!);
     return decodedToken;
   }

   //para remover el usuario del localStorage, por seguridad de la aplcacion. 
   removeLocalStorage(): void{
     localStorage.removeItem('token');
   }


   // para devolver el token para los guards de las rutas. 
   grtToken(): string{
     return (localStorage.getItem('token')!);
   }

   getUserRole(): any {
      this.userRole = this.getTokenDecoded().roleUsuario;  
   }

}
