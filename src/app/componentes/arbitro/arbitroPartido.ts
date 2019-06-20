import { Partido } from '../partido/partido';
import { Arbitro } from './arbitro';

export class ArbitroPartido {
    paarId: number;
    paarArbitroCentral: number;
    partido: Partido;
    arbitro: Arbitro;
}