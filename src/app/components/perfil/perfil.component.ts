import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario!: string;
  userName!: string;
  userRole!: string;
  img = true;

  constructor(private loginService: LoginService, private router: Router ) { }

  ngOnInit(): void {

    this.getUserName();
    this.getUserRole();
  }

  getUsuario(): void {
    //this.usuarioUsuario = this.loginService.getUsuario();
    console.log(this.loginService.getTokenDecoded());
    this.usuario = this.loginService.getTokenDecoded().sub;
    
  }

    getUserName():void{
    this.userName = this.loginService.getTokenDecoded().nombreUsuario; 
  }

    getUserRole():void{
    this.userRole = this.loginService.getTokenDecoded().roleUsuario; 
  }

  cCambiarPasword(): void{
    this.img = false;
    this.router.navigate(['panel/cambiar']);

  }

  cInicio(): void{  
    this.router.navigate(['panel']);
    this.img = true;
  }

}
