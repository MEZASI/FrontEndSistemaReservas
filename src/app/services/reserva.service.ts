import  { Injectable } from '@angular/core';
import  { ClienteReserva, Reserva } from '../models/modelsReserva' ;
import  { HttpClient } from '@angular/common/http';
import  { environment } from '../../environments/environment';
import  { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
myAppUrl: string;
myApiUrl: string;

  constructor(private http: HttpClient) { 
  	this.myAppUrl = environment.endpoint;
  	this.myApiUrl = '/api/reserva';
  }


  getListCustomers(): Observable<any>{
  	return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaClientes');

  }

  getListPackages(): Observable<any>{
  	return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaPaquetes');

  }

  getListUsers(): Observable<any>{
  	return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaUsuarios');

  }

  saveReservation(reserva: Reserva): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl +'/registrarReservacion', reserva);
  }

  getListBooksByUser(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/obternerListaReservasxUsuario');
  }

  getBooksLists():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + '/obternerListaReservas');
  }

  deleteReserva(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id);
  }

}
