import { Component, OnInit } from '@angular/core';
import  { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import  { ReservaService } from 'src/app/services/reserva.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	usuario!: string;
  userRole!: string;
  userName!: string;
  img = true;
 

  constructor(private loginService: LoginService, 
              private router: Router,
              private reservaService: ReservaService)
   {

   }

  ngOnInit(): void {
  	this.getUsuario();
    this.getUserRole();
    this.getUserName();
    
  }

  getUsuario(): void {
  	//this.usuarioUsuario = this.loginService.getUsuario();
    console.log(this.loginService.getTokenDecoded());
    this.usuario = this.loginService.getTokenDecoded().sub;
    
  }

  logOut(): void {
    this.loginService.removeLocalStorage();
    this.router.navigate(['/login']);
  }

  getUserName():void{
    this.userName = this.loginService.getTokenDecoded().nombreUsuario; 
  }

  getUserRole():void{
    this.userRole = this.loginService.getTokenDecoded().roleUsuario; 
  }

  cUsuarios(): void{
    this.img = false;
    this.router.navigate(['panel/registrar']);
  }

  cPanel(): void{
    this.img = true;
    this.router.navigate(['panel']);
  }

  cClientes(): void{
    this.img = false;
    this.router.navigate(['panel/clientes']);
  }

  cPaqutes():void{
    this.img = false;
    this.router.navigate(['panel/paquetes']);
  }

  cReservas(): void{
    this.img = false;
    this.router.navigate(['panel/reservas']);
  }

  cBitacora(): void{
    this.img = false;
    this.router.navigate(['panel/bitacora']);
  }

  cTareas(): void{
    this.img = false;
    this.router.navigate(['panel/tareas']);
  }

  cPerfil(): void{
    this.img = false;
    this.router.navigate(['panel/perfil']);
  }

}
