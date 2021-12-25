import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivateChild {

   constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService){

   }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
  	if(this.loginService.getUserRole() == 'Campo'){
  		this.toastr.warning('El usuario no puede acceder a esta ruta', 'Opsss!');
  		this.router.navigate(['/panel']);
  	}
  	return true;
  }
  
}
