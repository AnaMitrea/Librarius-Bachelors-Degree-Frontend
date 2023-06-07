export interface Level {
  id: number;
  name: string;
  minPoints: number;
  maxPoints: number;
}


export interface UserStats {
  points: number;
  level: string;
}
