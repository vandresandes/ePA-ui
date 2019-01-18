import { MotivoSigiloSegredoJustica } from './motivo-sigilo-segredo-justica';
import { SigiloSegredoJustica } from './sigilo-segredo-justica';
import { PrioridadeTramitacao } from './prioridade-tramitacao';
import { TermoEspecifico } from './termoEspecifico';
import { TermoGeral } from './termoGeral';
import { TipoProcesso } from './tipoProcesso';
import { Motivo } from './motivo';
import { Materia } from './materia';
import { Origem } from './origem';
export class Processo {
  numeroProcesso: string;
  justificativa: string;
  solicitadaUrgencia: boolean;
  documentoComprobatorio: [];

  origem: Origem;
  materia: Materia;
  tipoProcesso: TipoProcesso;
  termoGeral: TermoGeral;
  termoEspecifico: TermoEspecifico;
  prioridadeTramitacao: PrioridadeTramitacao;
  sigiloSegredoJustica: SigiloSegredoJustica;
  motivoSigiloSegredoJustica: MotivoSigiloSegredoJustica;
}
