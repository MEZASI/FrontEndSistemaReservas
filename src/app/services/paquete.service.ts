import { Injectable } from '@angular/core';
import  { Paquete, PaquetexModificar } from '../models/paquete';
import  { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import  { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
myAppUrl: string;
myApiUrl: string;

  constructor(private http: HttpClient) { 
  	this.myAppUrl = environment.endpoint;
  	this.myApiUrl = '/api/paquete';
  }

  public paqueteSeleccionado : PaquetexModificar = {
    paqueteId:'',
    nombrePaquete: '',
    descripcionPaquete: ''   
  };

  createPackage(paquete : Paquete): Observable<any>{
  	return this.http.post(this.myAppUrl + this.myApiUrl, paquete);
  }

  getListPackages(): Observable<any>{
  	return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaPaquetes');

  }

  editPackage(id: number, paqueteEditado: PaquetexModificar  ): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id , paqueteEditado );
  }

    deletePackage(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl+'/'+ id);
  }

}
