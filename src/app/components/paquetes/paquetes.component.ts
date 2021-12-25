import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { Paquete, PaquetexModificar } from 'src/app/models/paquete';
import { PaqueteService } from 'src/app/services/paquete.service';
import { ToastrService } from 'ngx-toastr';
import  { PaqueteReserva } from 'src/app/models/modelsReserva';


@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
crearPaquete: FormGroup;
listaPaquetes: any = [];
loading = false;

  constructor(private fb: FormBuilder, 
  	          private paqueteService: PaqueteService, 
  	          private toastr: ToastrService) { 
     
    this.crearPaquete = this.fb.group({
    	nombrePaquete:          ['', Validators.required], 
    	descripcionPaquete:     ['', Validators.required]
    });
  }

  public paqueteSeleccionado : PaquetexModificar = {
    paqueteId:'',
    nombrePaquete: '',
    descripcionPaquete: ''
  };


  resgistrarPaquete(): void{
  	console.log(this.crearPaquete);

  	const paquete: Paquete ={
  		nombrePaquete: this.crearPaquete.value.nombrePaquete,
  		descripcionPaquete: this.crearPaquete.value.descripcionPaquete
  	}
  	this.crearPaquete.reset();
  	this.paqueteService.createPackage(paquete).subscribe(data =>{
  		console.log(data);
  		this.toastr.success('El paquete '+ paquete.nombrePaquete +' fue registrado ' ,'Paquete Registrado', {
  			timeOut: 3000,
  			positionClass: 'toast-center-center'
  		});
      this.getPaquetes();
  	}, error => {
  		this.crearPaquete.reset();
  		console.log(error);
  		this.toastr.error(error.error.message, 'Error', {
  			timeOut: 3000,
  			positionClass: 'toast-center-center'
  		});
  	});
  }

  ngOnInit(): void {
    this.getPaquetes();
  }

  getPaquetes(): void {
    this.paqueteService.getListPackages().subscribe(data =>{
      console.log(data);
      this.listaPaquetes = data;
    }, error =>{
      console.log(error);
    }

    );
  }

  editarPaqueteModal(paquete: PaquetexModificar): void{
    this.paqueteService.paqueteSeleccionado = Object.assign({}, paquete)
  }

  eliminarPaquete(id: number): void{
    if (confirm("Esta seguro que desea eliminar el paquete ?")) {
      this.loading = true;
      this.paqueteService.deletePackage(id).subscribe(data =>{
        this.toastr.success('Ea paquete fue eliminado', 'Registro eliminado');
        this.loading = false;
        this.getPaquetes();
      }, error => {
        this.loading = false;
        this.toastr.error('No se pudo eliminar el paquete','Error al eliminar');
      });
    }
  }



}
