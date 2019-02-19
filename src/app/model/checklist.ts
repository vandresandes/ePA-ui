import { Documento } from './documento';
import { TermoEspecifico } from './termoEspecifico';
import { TermoGeral } from './termoGeral';
import { Nucleo } from './nucleo';
import { TipoProcesso } from './tipoProcesso';

export class Checklist {
  id: number;
  nucleo: Nucleo;
  tipoProcesso: TipoProcesso;
  termoGeral: TermoGeral;
  termoEspecifico: TermoEspecifico;
  documento: Documento;
  obrigatorio: boolean;
  prioridade: string;
  numeroDocumentoSEI: string;
}
