import { TermoEspecifico } from './termoEspecifico';
import { TermoGeral } from './termoGeral';
import { TipoProcesso } from './tipoProcesso';
import { Motivo } from './motivo';
import { Materia } from './materia';
export class Processo {
  numeroProcesso: string;
  motivo: Motivo;
  prioridadeTramitacao: string;
  justificativa: string;
  sigiloSegredoJustica: string;
  motivoSigiloSegredoJustica: string;
  solicitadaUrgencia: Boolean;
  origem: string;
  materia: Materia;

  tipoProcesso: TipoProcesso;
  termoGeral: TermoGeral;
  termoEspecifico: TermoEspecifico;
  documentoComprobatorio: [];
}
