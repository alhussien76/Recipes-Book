import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective   {
    dropdown=false;
  
    constructor( private elRef:ElementRef){}
    ngOnInit(){}
  @HostBinding('class.open') addclass=false;
  @HostListener('click') mouseclick(event:Event){
      this.addclass=!this.addclass
  }
}