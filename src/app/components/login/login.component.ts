import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { usuarioLogin } from '../../models/usuarioLogin';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import  { LoginService } from 'src/app/services/login.service';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;  
  login: FormGroup;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ['', Validators.required], 
      password: ['', Validators.required]

    });

  }

  ngOnInit(): void {
  }

  log(): void{

    if (this.login.invalid) {
      return;
    }

    const usuario: usuarioLogin = {
      usuarioUsuario: this.login.value.usuario,
      passwordUsuario: this.login.value.password
    };
    this.loading = true;
    this.loginService.login(usuario).pipe(first()).subscribe(data =>{
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/panel']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message ,'Error', {
        timeOut: 1000,
        positionClass: 'toast-top-right'
      });
      this.login.reset();
    });
   /* setTimeout(()=>{
      if (usuario.nombreUsuario === 'sebas' && usuario.password === '1234'){
        this.login.reset();
        this.router.navigate(['/panel']);

      }else{

      }
      this.loading = false;

    }, 3000); */
  }

}
