export interface TrophyChallengeModel {
  id: number;
  title: string;
  category: string;
  instructions: string;
  imageSrcPath: string;
}

export interface ChallengeCategoryModel {
  [category: string]: {
    htmlId: string;
    trophies: TrophyChallengeModel[];
  };
}
