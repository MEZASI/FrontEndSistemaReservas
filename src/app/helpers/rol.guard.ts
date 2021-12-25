import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

	   constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService){

   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  	if(this.loginService.getTokenDecoded().roleUsuario.includes('Campo')){
  		this.toastr.warning('El usuario no puede acceder a esta ruta', 'Opsss!');
  		this.router.navigate(['/panel']);
  	}
  	return true;
  }
  
}
