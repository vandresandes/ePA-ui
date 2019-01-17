import { stringify } from '@angular/compiler/src/util';

export class AppUtil {

  public static isNull(field: any): boolean {
    return field === '' || field === null || field === undefined;
  }

  public static convertNumberToString(field: number): string {
    return this.isNull(field) ? null : String(field);
  }

  /*
  public validaTelefone() {

    var masks = [ '(00) 0000-00000', '(00) 0000-00000' ], maskBehavior = function(
        val, e, field, options) {
      return val.length > 15 ? masks[0] : masks[1];
    };

    $('.mask-telefone').mask(maskBehavior, {
      onKeyPress : function(val, e, field, options) {
        field.mask(maskBehavior(val, e, field, options), options);
      }
    });
  }
  */
}
