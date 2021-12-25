import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import  { Cliente, ClientexModificar } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import  { ClienteReserva } from 'src/app/models/modelsReserva';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listaClientes: any = [];
  loading = false;

	registrarCliente: FormGroup;

  constructor(private fb: FormBuilder, 
              private toastr: ToastrService,
              private clienteService: ClienteService) { 
  	this.registrarCliente = this.fb.group({
  		cedulaCliente:   ['', Validators.required], 
  		nombreCliente:   ['', Validators.required],
      segundoNombreCliente: [''],
  		primerApellido:  ['', Validators.required],
  		segundoApellido: ['', Validators.required],
  		telefonoCliente: ['', Validators.required],
  		correoCliente:   ['', Validators.required],
      ciudadCliente:   ['', Validators.required]
  	});
  }


     public clienteSeleccionado : ClientexModificar = {
     clienteId:'',
     cedulaCliente: '',
     nombreCliente: '',
     segundoNombreCliente: '',
     primerApellidoCliente: '', 
     segundoApellidoCliente: '', 
     correoCliente: '', 
     telefonoCliente:'', 
     ciudadCliente:''
   };




  registrarCx():void{

    console.log(this.registrarCliente);
    const cliente: Cliente ={
      cedulaCliente: this.registrarCliente.value.cedulaCliente,
      nombreCliente: this.registrarCliente.value.nombreCliente,
      segundoNombreCliente: this.registrarCliente.value.segundoNombreCliente, 
      primerApellidoCliente: this.registrarCliente.value.primerApellido,
      segundoApellidoCliente: this.registrarCliente.value.segundoApellido, 
      correoCliente: this.registrarCliente.value.correoCliente,
      telefonoCliente: this.registrarCliente.value.telefonoCliente,
      ciudadCliente: this.registrarCliente.value.ciudadCliente
    }
    this.registrarCliente.reset();
    this.clienteService.saveCustomer(cliente).subscribe(data =>{
      console.log(data);
      this.toastr.success('El Cliente '+ cliente.nombreCliente +' fue registrado ' ,'Cliente Registrado', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
      this.getClientes();
    }, error => {
     // this.registrarCliente.reset();
      console.log(error);
      this.toastr.error(error.error.message, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
    });
  }

  ngOnInit(): void {
    this.getClientes();
  }

    getClientes(): void {
    this.clienteService.getListCustomers().subscribe(data =>{
      console.log(data);
      this.listaClientes = data;
    }, error =>{
      console.log(error);
    }

    );
  }


    editarClienteModal(cliente: ClientexModificar): void{
    this.clienteService.clienteSeleccionado = Object.assign({}, cliente)
  }

  eliminarCliente(id: number): void{
    if (confirm("Esta seguro que desea eliminar el usuario ?")) {
      this.loading = true;
      this.clienteService.deleteCx(id).subscribe(data =>{
        this.toastr.success('El usuario fue eliminado', 'Registro eliminado');
        this.loading = false;
        this.getClientes();
      }, error => {
        this.loading = false;
        this.toastr.error('No se pudo eliminar registro','Error al eliminar');
      });
    }
  }



}
