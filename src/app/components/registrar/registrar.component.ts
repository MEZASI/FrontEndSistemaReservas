import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { Usuario, ModificarUsuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import  {  UsuarioReserva } from 'src/app/models/modelsReserva';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registrar: FormGroup;
  listaUsuarios: any = [];
  loading = false; 


  ngOnInit(): void {
    this.getUsuarios();
  }



  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private toastr: ToastrService) { 
    this.registrar = this.fb.group({
      correoUsuario:   ['', Validators.required], 
      nombreUsuario:   ['', Validators.required],
      usuarioUsuario:  ['', Validators.required],
      passwordUsuario: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required], 
      rolUsuario:      ['', Validators.required], 
    }, {  validators: this.confirmarPassword}); 

  }


   public usuarioSeleccionado : ModificarUsuario = {
     id:'',
     usuarioUsuario: '',
     nombreUsuario: '',
     correoUsuario: '',
     rolUsuario: '', 
     passwordUsuario: ''
   };

  registrarUsuario():void{
    console.log(this.registrar);

    const usuario: Usuario ={
      usuarioUsuario: this.registrar.value.usuarioUsuario,
      passwordUsuario: this.registrar.value.passwordUsuario,
      nombreUsuario: this.registrar.value.nombreUsuario, 
      correoUsuario: this.registrar.value.correoUsuario,
      rolUsuario: this.registrar.value.rolUsuario, 
    }
    this.registrar.reset();
    this.usuarioService.saveUser(usuario).subscribe(data =>{
      console.log(data);
      this.toastr.success('El usuario '+ usuario.usuarioUsuario +' fue registrado ' ,'Usuario Registrado', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
      this.getUsuarios();
    }, error => {
      this.registrar.reset();
      console.log(error);
      this.toastr.error(error.error.message, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-center-center'
      });
    });
  }


  confirmarPassword( group: FormGroup): any{
    const pass = group.controls.passwordUsuario.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  getUsuarios(): void {
    this.usuarioService.getListUsers().subscribe(data =>{
      console.log(data);
      this.listaUsuarios = data;
    }, error =>{
      console.log(error);
    }

    );
  }

  eliminarUsuario(id: number): void{
    if (confirm("Esta seguro que desea eliminar el usuario ?")) {
      this.loading = true;
      this.usuarioService.deleteUser(id).subscribe(data =>{
        this.toastr.success('El usuario fue eliminado', 'Registro eliminado');
        this.loading = false;
        this.getUsuarios();
      }, error => {
        this.loading = false;
        this.toastr.error('No se pudo eliminar registro','Error al eliminar');
      });
    }
  }

  editarUsuarioModal(usuario: ModificarUsuario): void{
    this.usuarioService.usuarioSeleccionado = Object.assign({}, usuario);
  }

}
