import  { Component, OnInit } from '@angular/core';
import  { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { ClienteReserva, PaqueteReserva, UsuarioReserva, Reserva } from 'src/app/models/modelsReserva';
import  { ReservaService } from 'src/app/services/reserva.service';
import  { ToastrService } from 'ngx-toastr';
import  { formatDate, DatePipe } from '@angular/common';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
	crearReserva: FormGroup;
  fechaReserva = new Date();
  minDate = new Date();
	public selectedCustomer = {clienteId:0, nombreCliente:'' };
	listaClientes: ClienteReserva[] = [];
	listaPaquetes: PaqueteReserva[] = [];
	listaUsuarios: UsuarioReserva[] = []; 

  constructor(private fb: FormBuilder, 
    private reservaService: ReservaService, 
    private toastr: ToastrService,) {


    this.crearReserva = this.fb.group({
      clienteReserva:       ['', Validators.required],
      paqueteReserva:       ['', Validators.required],
      usuarioReserva:       ['', Validators.required],
      descripcionReserva:   ['', Validators.required],
      fechaReserva:         ['', Validators.required]
    });

  }

  registrarReserva():void{
    console.log(this.crearReserva);
    const reserva: Reserva = {
      paqueteId: this.crearReserva.value.paqueteReserva,
      clienteId: this.crearReserva.value.clienteReserva,
      usuarioId: this.crearReserva.value.usuarioReserva,
      descripcionTarea: this.crearReserva.value.descripcionReserva, 
      reservaFecha: this.crearReserva.value.fechaReserva
    }
    console.log(reserva);
    this.crearReserva.reset();
    this.reservaService.saveReservation(reserva).subscribe(data =>{
      console.log(data);
      this.toastr.success('La reserva  fue registrada con exito ' ,'Reserva Registrada!', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
      console.log(this.crearReserva);
    }, error => {
      // this.registrarCliente.reset();
      console.log(error);
      this.toastr.error(error.error.Message, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
    });
  }


  getClientes(): void {
  	this.reservaService.getListCustomers().subscribe(data =>{
  		console.log(data);
  		this.listaClientes = data;
  	}, error =>{
  		console.log(error);
  	}

  	);
  }

  getPaquetes(): void {
  	this.reservaService.getListPackages().subscribe(data =>{
  		console.log(data);
  		this.listaPaquetes = data;
  	}, error =>{
  		console.log(error);
  	}

  	);
  }

  getUsuarios(): void {
  	this.reservaService.getListUsers().subscribe(data =>{
  		console.log(data);
  		this.listaUsuarios = data;
  	}, error =>{
  		console.log(error);
  	}

  	);
  }

  ngOnInit(): void {
  	this.getClientes();
  	this.getPaquetes();
  	this.getUsuarios();
  }

}
