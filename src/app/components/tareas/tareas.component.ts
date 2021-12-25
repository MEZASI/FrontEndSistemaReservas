import { Component, OnInit } from '@angular/core';
import  { Reserva } from 'src/app/models/reserva';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import  { ReservaService } from 'src/app/services/reserva.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
	  listaReservasxUsuario: any = [];

	  constructor(private router: Router,
	  	         private reservaService: ReservaService, 
               private toastr: ToastrService ) { }

  ngOnInit(): void {
  	 this.getListaxUsuario();
  }

  getListaxUsuario(): void {
  	this.reservaService.getListBooksByUser().subscribe(data =>{
  		console.log(data);
  		this.listaReservasxUsuario = data;
  	}, error =>{
  		console.log(error);
  	});
  }

  terminarTarea(id: number): void{
    if(confirm("Esta seguro de que desea dar por terminada la tarea")){
      console.log(id);
      this.reservaService.deleteReserva(id).subscribe(data => {
        this.toastr.success("La tarea fue completada con exito", "Completado");
        this.getListaxUsuario();
      }, error=> {
        this.toastr.error(error.error.message, "Error");
        console.log(id);
      });
    }

  }

}
