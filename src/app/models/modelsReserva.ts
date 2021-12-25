export class ClienteReserva  {
	clienteId!: string;
	cedulaCliente!: string;
	nombreCliente!: string;
	segundoNombreCliente!: string;
	primerApellidoCliente!: string;
	segundoApellidoCliente!: string;
	correoCliente!: string;
	telefonoCliente!: string;
	estadoRegistroCliente!: string;
	ciudadCliente!: string;
}

export class PaqueteReserva  {
	paqueteId!: string;
	nombrePaquete!: string;
	descripcionPaquete!: string;
	estadoRegistroPaquete!: string;
}

export class UsuarioReserva  {
	id!: string;
	usuarioUsuario!: string;
	passwordUsuario!: string;
	nombreUsuario!: string;
	correoUsuario!: string;
	rolUsuario!: string;
	estadoRegistroUsuario!: string;
}

export class Reserva  {
	paqueteId!: string;
	clienteId!: string;
	usuarioId!: string;
	descripcionTarea!: string;
	reservaFecha!: string | Date;
}
