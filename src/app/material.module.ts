import { NgModule, LOCALE_ID } from '@angular/core'; //

// elemntos angular material 

import  {MatDatepickerModule } from '@angular/material/datepicker';
import  {MatInputModule} from '@angular/material/input';
import  {MatMomentDateModule } from '@angular/material-moment-adapter';
import  {MatCardModule} from '@angular/material/card';
import  {MatButtonModule} from '@angular/material/button';
import  {MatAutocompleteModule} from '@angular/material/autocomplete';


//date

import { registerLocaleData } from '@angular/common';
import  localesEs from '@angular/common/locales/es-CR';


//registrar la fecha local 

registerLocaleData(localesEs);



@NgModule({
	imports:[
	MatInputModule,
	MatDatepickerModule,
	MatMomentDateModule, 
	MatCardModule, 
	MatButtonModule, 
	MatAutocompleteModule

	],
	exports:[
	MatInputModule,
	MatDatepickerModule, 
	MatMomentDateModule, 
	MatCardModule, 
	MatButtonModule, 
	MatAutocompleteModule

	], 
	providers:[
	
	]
})

export class MaterialModule{

}