import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

//importar componentes 
import { InicioComponent } from './components/inicio/inicio.component';
import   { LoginComponent } from './components/login/login.component';
import  { RegistrarComponent } from './components/registrar/registrar.component';
import  { AdminComponent } from './components/admin/admin.component';
import  { ReservasComponent } from './components/reservas/reservas.component';
import  { ClientesComponent } from './components/clientes/clientes.component';
import  { PaquetesComponent } from './components/paquetes/paquetes.component';
import  { BitacoraComponent } from './components/bitacora/bitacora.component';
import  { CambiarpasswordComponent } from './components/cambiarpassword/cambiarpassword.component';
import  { TareasComponent } from './components/tareas/tareas.component';
import  { PerfilComponent } from './components/perfil/perfil.component';


// guards

import { AuthGuard } from './helpers/auth.guard';
import { RolesGuard } from './helpers/roles.guard';
import { RolGuard } from './helpers/rol.guard';




const routes: Routes = [

{ path: '', redirectTo: '/login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent},
{ path: 'panel', component: AdminComponent, canActivate:[AuthGuard],
children:[
{ path: 'registrar', component: RegistrarComponent , canActivate:[RolGuard]},
{ path: 'reservas', component: ReservasComponent ,canActivate:[RolGuard]},
{ path: 'clientes', component: ClientesComponent ,canActivate:[RolGuard]},
{ path: 'paquetes', component: PaquetesComponent ,canActivate:[RolGuard]}, 
{ path: 'bitacora', component: BitacoraComponent,canActivate:[RolGuard]},
{ path: 'cambiar', component: CambiarpasswordComponent,}, 
{ path: 'tareas', component: TareasComponent,}, 
{ path: 'perfil', component: PerfilComponent,}
]},
{ path: '**', redirectTo:'/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
