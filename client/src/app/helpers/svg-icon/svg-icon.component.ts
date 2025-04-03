import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: `<svg:use [attr.href]="href" [attr.height]="height" [attr.width]="width"></svg:use>`,
  styles: [''],
})
export class SvgIconComponent {
  @Input() icon = '';
  @Input() height: string = '0';
  @Input() width: string = '0';
  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
