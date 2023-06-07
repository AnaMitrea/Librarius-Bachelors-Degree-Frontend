import { Component } from '@angular/core';

export interface Level {
  name: string;
  points: number;
}

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent {
  currentLevel: Level = {
    name: 'Bookworm',
    points: 694
  };

  levels: Level[] = [
    { name: 'Novice', points: 0 },
    { name: 'Reader', points: 250 },
    { name: 'Bookworm', points: 500 },
    { name: 'Bibliophile', points: 1000 },
    { name: 'Librarius', points: 2500 }
  ];
}


