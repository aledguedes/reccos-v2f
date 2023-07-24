import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();

    const allDropdown = this.elementRef.nativeElement.querySelectorAll('.side-dropdown');
    const currentDropdown = this.elementRef.nativeElement.querySelector('.side-dropdown');

    if (!currentDropdown || !currentDropdown.parentElement) return;

    const a = currentDropdown.parentElement.querySelector('a:first-child');

    if (!a) return;

    if (!a.classList.contains('active')) {
      allDropdown.forEach((item: HTMLElement) => {
        const aLink = item.parentElement?.querySelector('a:first-child');
        if (aLink) aLink.classList.remove('active');
        item.classList.remove('show');
      });
    }

    a.classList.toggle('active');
    currentDropdown.classList.toggle('show');
  }

}
