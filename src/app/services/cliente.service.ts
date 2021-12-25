import { Injectable } from '@angular/core';
import  { Cliente , ClientexModificar } from '../models/cliente';
import  { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import  { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

	myAppUrl: string;
	myApiUrl: string

  constructor(private http: HttpClient) {
  	this.myAppUrl = environment.endpoint;
  	this.myApiUrl = '/api/cliente';
   }

   public clienteSeleccionado : ClientexModificar = {
     clienteId:'',
     cedulaCliente: '',
     nombreCliente: '',
     segundoNombreCliente: '',
     primerApellidoCliente: '',
     segundoApellidoCliente: '', 
     correoCliente: '' , 
     telefonoCliente: '' , 
     ciudadCliente: ''     
   };

   saveCustomer(cliente: Cliente): Observable<any>{
   	return this.http.post(this.myAppUrl + this.myApiUrl, cliente);
   }

     getListCustomers(): Observable<any>{
    return this.http.get(this.myAppUrl+ this.myApiUrl +'/obternerListaClientes');

  }

    editCustomer(id: number, clienteEditado: ClientexModificar  ): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id , clienteEditado );
  }

  deleteCx(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl+'/'+ id);
  }

}
