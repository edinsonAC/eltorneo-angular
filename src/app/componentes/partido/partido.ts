import { Equipo } from '../equipo/equipo';
import { Torneo } from '../torneo/torneo';

export class Partido {
    partId: number;
    golesA: number;
    golesB: number;
    partDia: String;
    partEstado: boolean;
    partFecha: string;
    partJornada: number;
    equipo1: Equipo;
    equipo2: Equipo;
    torneo: Torneo;
}