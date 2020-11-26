import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  @Input() appChangeColor:string;
 
  constructor(private element: ElementRef){}

  @HostListener('mouseenter')
  public onMouseEnter(){
      this.element.nativeElement.style.backgroundColor = this.appChangeColor;
  }

  @HostListener('mouseleave')
  public onMouseLeave(){
      this.element.nativeElement.style.backgroundColor = '';
  }


}
