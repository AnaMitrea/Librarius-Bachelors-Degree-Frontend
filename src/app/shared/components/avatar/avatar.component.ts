import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() userNameInitial!: string;

  getBackgroundColor(): string {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    return `bg_color_${randomNumber}`;
  }
}
