export interface TrophyChallengeModel {
  id: number;
  title: string;
  category: string;
  instructions: string;
  imageSrcPath: string;
  isWon: boolean;
}

export interface ChallengeCategoryModel {
  [category: string]: {
    htmlId: string;
    trophies: TrophyChallengeModel[];
  };
}



export interface TrophiesByCategoryModel {
  [category: string]: TrophyChallengeModel[];
}
