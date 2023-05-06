import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import {SetEarnedTrophiesAction, SetReadingTimeForBook} from './root.actions';
import { Trophies, UserActivity, UserStats } from "@app-store/models/shared-user.model";
import {updateReadingTimeForBook} from "@app-store/utils";

export interface SharedUserStateModel {
  username: string;
  stats: UserStats;
  activity: UserActivity;
  earnedTrophies: Trophies;
}

const defaults: SharedUserStateModel = {
  username: 'User',
  stats: {
    points: 0,
    level: 'Beginner'
  },
  activity: {
    bookTimeTracker: {},
    currentStreak: 0,
    longestStreak: 0
  },
  earnedTrophies: {}
};

@State<SharedUserStateModel>({
  name: 'sharedUserState',
  defaults
})
@Injectable()
export class RootState implements NgxsOnInit{
  ngxsOnInit(ctx: StateContext<any>): void {}

  @Action(SetEarnedTrophiesAction)
  setEarnedTrophies({ patchState }: StateContext<SharedUserStateModel>, { payload }: SetEarnedTrophiesAction) {
    patchState({ earnedTrophies: payload });
  }

  @Action(SetReadingTimeForBook)
  updateReadingTimeForBookId(ctx : StateContext<SharedUserStateModel>, { payload }: SetReadingTimeForBook) {
    ctx.setState(updateReadingTimeForBook(payload));
  }
}
