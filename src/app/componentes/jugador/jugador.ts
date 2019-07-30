import { Equipo } from '../equipo/equipo';
import { PosicionJugador } from './posicionJugador';

export class Jugador {
    jugaId: number;
    jugaApellido: String;
    jugaCelular: String;
    jugaDireccion: String;
    jugaDocumento: String;
    jugaDorsal: number;
    jugaEstado: number;
    jugaNombre: String;
    jugaTelefono: String;
    equipo: Equipo;
    posicionJugador: PosicionJugador;
}