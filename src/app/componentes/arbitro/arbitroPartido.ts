import { Partido } from '../partido/partido';
import { Arbitro } from './arbitro';

export class PartidoArbitro {
    paarId: number;
    paarArbitrocentral: number;
    partido: Partido;
    arbitro: Arbitro;
}