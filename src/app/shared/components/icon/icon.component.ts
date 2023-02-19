import { Component, Input } from '@angular/core';
import { allIcons } from './models';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() iconName: string = '';

  public icons = allIcons;
  public src: string = '';
  public alt: string = '';

  constructor() {
    this.setIcon();
  }

  public setIcon() {
    const icon = this.icons.find(icon => icon.name === this.iconName);
    this.src = icon ? icon.src : '';
    this.alt = icon ? icon.alt : '';
  }
}
