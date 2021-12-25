import  { Component, OnInit } from '@angular/core';
import  { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { Reserva } from 'src/app/models/reserva';
import  { ReservaService } from 'src/app/services/reserva.service';
import  { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
	listaReservas: any = [];

	constructor(private reservaService: ReservaService, 
		        private toastr: ToastrService) {


    }

	ngOnInit(): void {
		this.getReservasList();
	}

	getReservasList(): void {
		this.reservaService.getBooksLists().subscribe(data =>{
			console.log(data);
			this.listaReservas = data;
		}, error =>{
			console.log(error);
		}

		);
	}

}
