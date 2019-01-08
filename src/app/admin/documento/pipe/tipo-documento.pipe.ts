import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoDocumento'
})
export class TipoDocumentoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'EM_ANALISE') {
      return 'Em análise';
    }
    return value === 'DOCUMENTO' ? "Documento" : "Informação";
  }

}
