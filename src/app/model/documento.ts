import { EnumTipoDocumento } from '../enums/enum-tipo-documento.enum';

export class Documento {
  id: number;
  nome: string;
  tipo: EnumTipoDocumento;
}
