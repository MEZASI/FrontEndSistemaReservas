import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import  { Usuario, ModificarUsuario, UsuarioaModificar } from 'src/app/models/usuario';
import  { Cliente, ClientexModificar } from 'src/app/models/cliente';
import  { Paquete, PaquetexModificar } from 'src/app/models/paquete';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

	actualizar!: FormGroup;
	actualizarCliente!: FormGroup;
	actualizarPaquete!: FormGroup;

  constructor(private fb: FormBuilder, public usuarioService: UsuarioService, 
  	           private toastr: ToastrService, public clienteService: ClienteService, 
  	           public paqueteService: PaqueteService, private router: Router
  	) 
  { 
  	this.actualizar = this.fb.group({
  		id:              [''],
  		usuarioUsuario:  [''],
  		passwordUsuario: [''],
  		nombreUsuario:   [''],
  		correoUsuario:   [''],
  		rolUsuario:      [''], 
  	}), 
  	this.actualizarCliente = this.fb.group({
  		clienteId:                     [''],
  		cedulaCliente:                 [''],
  		nombreCliente:                 [''],
  		segundoNombreCliente:          [''],
  		primerApellidoCliente:         [''],
  		segundoApellidoCliente:        [''], 
  		correoCliente:                 [''], 
  		telefonoCliente:               [''], 
  		ciudadCliente:                 [''], 

  	}), 
  	  	this.actualizarPaquete = this.fb.group({
  		paqueteId:                     [''],
  		nombrePaquete:                 [''],
  		descripcionPaquete:            [''],

  	})
  }


  ngOnInit(): void {
  }
  

  actualizarUsuario(idActualizar: number):void{

  	const usuarioEditado: UsuarioaModificar = {
  		id: this.actualizar.value.id,
  		usuarioUsuario: this.actualizar.value.usuarioUsuario,
  		passwordUsuario: this.actualizar.value.passwordUsuario,
  		nombreUsuario: this.actualizar.value.nombreUsuario,
  		correoUsuario: this.actualizar.value.correoUsuario,
  		rolUsuario: this.actualizar.value.rolUsuario	
  	}
  	this.usuarioService.editUser(idActualizar, usuarioEditado ).subscribe(data =>{
  		this.toastr.success('Usuario actualizado correctamente', 'Modificación Correcta');
      this.actualizar.reset();
  	}, error =>{
  		this.toastr.error( error.error.message, "Error");
  	});

  }

  actualizarCx(Id: number): void{

  	const clienteEditado:  ClientexModificar = {
  		clienteId: this.actualizarCliente.value.clienteId,
  		cedulaCliente: this.actualizarCliente.value.cedulaCliente,
  		nombreCliente: this.actualizarCliente.value.nombreCliente,
  		segundoNombreCliente: this.actualizarCliente.value.segundoNombreCliente,
  		primerApellidoCliente: this.actualizarCliente.value.primerApellidoCliente,
  		segundoApellidoCliente: this.actualizarCliente.value.segundoApellidoCliente, 
  		correoCliente: this.actualizarCliente.value.correoCliente,
  		telefonoCliente: this.actualizarCliente.value.telefonoCliente,
  		ciudadCliente: this.actualizarCliente.value.ciudadCliente
  	}
  	this.clienteService.editCustomer(Id, clienteEditado).subscribe(data=> {
  		this.toastr.success('Cliente actualizado correctamente', 'Modificación Correcta');

  	}, error =>{
  		this.toastr.error(error.error.message, "Error");
  	});
  }

  actualizarPackage(Id: number): void{

  	const paqueteEditado: PaquetexModificar = {
  		paqueteId: this.actualizarPaquete.value.paqueteId,
  		nombrePaquete: this.actualizarPaquete.value.nombrePaquete,
  		descripcionPaquete: this.actualizarPaquete.value.descripcionPaquete
  	}
  	this.paqueteService.editPackage(Id, paqueteEditado).subscribe(data =>{
  		this.toastr.success('Paquete actualizado correctamente', 'Modificación Correcta')
  	}, error =>{
  		this.toastr.error(error.error.message, 'Error');

  	});

  }

}
