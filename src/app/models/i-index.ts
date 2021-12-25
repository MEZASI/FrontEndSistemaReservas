import { HttpParameterCodec } from "@angular/common/http";

import {ClienteReserva} from "../models/modelsReserva";
import {PaqueteReserva} from "../models/modelsReserva";
import {UsuarioReserva} from "../models/modelsReserva";
import {Reserva} from "../models/modelsReserva";
import {Cliente, ClientexModificar} from "../models/cliente";
import {Paquete, PaquetexModificar} from "../models/paquete";
import {Usuario, ModificarUsuario, UsuarioaModificar} from "../models/usuario";
import {usuarioLogin, UserModel} from "../models/usuarioLogin";



export class CustomURLEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key); 
    }
    encodeValue(key: string): string { 
        return encodeURIComponent(key); 
    }
    decodeKey(key: string): string { 
        return decodeURIComponent(key); 
     }
    decodeValue(key: string) {
        return decodeURIComponent(key); 
     }
}