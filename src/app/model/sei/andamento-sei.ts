import { UnidadeSEI } from './unidade-sei';
import { UsuarioSEI } from './usuario-sei';

export class AndamentoSEI {
  descricao: string;
  dataHora: string;
  unidade: UnidadeSEI;
  usuario: UsuarioSEI;
}
