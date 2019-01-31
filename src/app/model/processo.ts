import { EnumSigiloSegredoJustica } from 'src/app/enums';
import { MotivoSigiloSegredoJustica } from './motivo-sigilo-segredo-justica';
import { TermoEspecifico } from './termoEspecifico';
import { TermoGeral } from './termoGeral';
import { TipoProcesso } from './tipoProcesso';
import { Materia } from './materia';
import { Origem } from './origem';
import { EnumPrioridadeTramitacao } from '../enums';

export class Processo {
  id: number;
  numeroProcesso: string;
  justificativa: string;
  solicitadaUrgencia: boolean;
  documentoComprobatorio: [];

  origem: Origem;
  materia: Materia;
  tipoProcesso: TipoProcesso;
  termoGeral: TermoGeral;
  termoEspecifico: TermoEspecifico;
  prioridadeTramitacao: EnumPrioridadeTramitacao;
  sigiloSegredoJustica: EnumSigiloSegredoJustica;
  motivoSigiloSegredoJustica: MotivoSigiloSegredoJustica;
  orgao: any;
  andamento: any;

  // Proponente
  nomeProponente: string;
  emailProponente: string;
  telefoneProponente: string;
}
