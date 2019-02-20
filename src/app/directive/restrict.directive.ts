import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[restrict]'
})
export class RestrictDirective {

  constructor(private control: NgControl) {}

  @HostListener('keypress', ['$event.target'])
  @HostListener('keyup', ['$event.target'])
  @HostListener('paste', ['$event.target'])
  private onInputEventkeyup(input: any) {
    if (input.value) {
      let truncated = input.value.replace(/[\D]/g, ''); // coloque seu pattern aqui
      // altere o valor apenas se contiver caracteres não permitidos
      if (truncated !== input.value) {
        this.control.valueAccessor.writeValue(truncated); //write to model
        this.control.viewToModelUpdate(truncated);        //write to view
      }
    }
  }

}
