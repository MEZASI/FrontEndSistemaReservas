import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//interceptors
import { AddTokenInterceptor } from '../app/helpers/add-token.interceptor' ;



//MODULOS
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';




//COMPONENTES
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaquetesComponent } from './components/paquetes/paquetes.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CambiarpasswordComponent } from './components/cambiarpassword/cambiarpassword.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { ModalComponent } from './components/modal/modal.component';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistrarComponent,
    AdminComponent,
    ReservasComponent,
    ClientesComponent,
    PaquetesComponent,
    BitacoraComponent,
    LoadingComponent,
    CambiarpasswordComponent,
    TareasComponent,
    ModalComponent,
    PerfilComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
       preventDuplicates: true
    }), 
    HttpClientModule,
    MaterialModule 
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
