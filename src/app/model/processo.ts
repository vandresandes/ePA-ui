import { TermoEspecifico } from './termoEspecifico';
import { TermoGeral } from './termoGeral';
import { TipoProcesso } from './tipoProcesso';
import { Motivo } from './motivo';
import { Materia } from './materia';
export class Processo {
  numeroProcesso: string;
  motivo: Motivo;
  prioridadeTramitacao: string;
  sigiloSegredoJustica: string;
  solicitadaUrgencia: string;
  origem: string;
  materia: Materia;

  tipoProcesso: TipoProcesso;
  termoGeral: TermoGeral;
  termoEspecifico: TermoEspecifico;
}
