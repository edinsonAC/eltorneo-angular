import { TipoUsuario } from '../jugador/tipoUsuario';

export class User {
    usuaId: string;
    password: string;
    usuaCorreo: string;
    usuaEstado: string;
    usuaFecharegistro: string;
    usuaImgperfil: string;
    usuaUsuario: string;
    tipoUsuario: TipoUsuario
}