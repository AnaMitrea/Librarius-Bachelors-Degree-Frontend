import {TrophyChallengeModel} from "@app-modules/home/shared/models/trophy-challenge.model";

export interface UserStats {
  points: number;
  level: string;
}

export interface UserActivity {
  currentStreak: number;
  longestStreak: number;
}

export interface Trophies {
  [category: string]: {
    trophies: TrophyChallengeModel[];
  };
}
