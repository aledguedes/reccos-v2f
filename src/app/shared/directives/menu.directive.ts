import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const subMenu = this.el.nativeElement.nextElementSibling;
    const isSubMenuVisible = subMenu.style.display !== 'none';

    const subMenus = document.querySelectorAll("#leftside-navigation ul ul");
    subMenus.forEach(menu => {
      (menu as HTMLElement).style.display = 'none';
    });

    if (!isSubMenuVisible) {
      subMenu.style.display = 'block';
    }

    event.stopPropagation();
  }

}
