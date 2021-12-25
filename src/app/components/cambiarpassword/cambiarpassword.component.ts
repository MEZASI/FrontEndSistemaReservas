import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.component.html',
  styleUrls: ['./cambiarpassword.component.css']
})
export class CambiarpasswordComponent implements OnInit {
	cambiarPasswordF: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
              private toastr: ToastrService,private router: Router ) {
  this.cambiarPasswordF = this.fb.group ({
  	passwordAnterior:['', Validators.required],
  	passwordNuevo:['', [Validators.required, Validators.minLength(4)]],
  	confirmarPassword: ['']


  }, {  validators: this.confirmarPassword}) 

  }

  ngOnInit(): void {
  }

  confirmarPassword(group: FormGroup): any{
  	const pass = group.controls.passwordNuevo.value;
  	const confirmPass = group.controls.confirmarPassword.value;
  	return pass === confirmPass ? null : {notSame: true};
  }

  guardarPassword(): void{

    const cambiarPassword: any = {
      passwordAnterior: this.cambiarPasswordF.value.passwordAnterior,
      nuevoPassword: this.cambiarPasswordF.value.passwordNuevo
    };
    console.log(cambiarPassword);
    this.loading = true;
    this.usuarioService.cambiarPassword(cambiarPassword).subscribe(data =>{
      this.toastr.info(data.message);
      this.router.navigate(['/panel']);
    }, error =>{
      this.loading = false;
      this.cambiarPasswordF.reset();
      this.toastr.error(error.error.message,'Error!');
    });
  }


}
