import {TrophyChallengeModel} from "@app-modules/home/shared/models/trophy-challenge.model";

export interface UserStats {
  points: number;
  level: string;
}

export interface UserActivity {
  bookTimeTracker: ReadingTimeTracker;
  currentStreak: number;
  longestStreak: number;
}

export interface Trophies {
  [category: string]: TrophyChallengeModel[];
}

export interface ReadingTimeTracker {
  [bookId: string]: {
    hasFinishedReading: boolean;
    timeSpentReading: number;
  }
}
