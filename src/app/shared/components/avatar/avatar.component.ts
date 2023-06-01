import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit{
  @Input() userNameInitial!: string;
  @Input() hasWhiteBoxShadow = false;

  getBackgroundColor(): string {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    return `bg_color_${randomNumber}`;
  }

  ngOnInit(): void {
    if (this.userNameInitial.length > 1) {
      this.userNameInitial = this.getFirstLetter(this.userNameInitial);
    }
  }

  getFirstLetter(text: string): string {
    return text.substring(0, 1);
  }
}
