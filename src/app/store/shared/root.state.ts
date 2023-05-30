import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import {SetEarnedTrophiesAction, SetReadingTimeForBook, SetUserInformation} from './root.actions';
import { Trophies, UserActivity, UserStats } from "@app-store/models/shared-user.model";
import {updateReadingTimeForBook, updateUserInfo} from "@app-store/utils";

export interface SharedUserStateModel {
  username: string;
  stats: UserStats;
  activity: UserActivity;
  earnedTrophies: Trophies;
  isDataFetched: boolean;
}

const defaults: SharedUserStateModel = {
  username: '',
  stats: {
    points: 0,
    level: ''
  },
  activity: {
    bookTimeTracker: {},
    currentStreak: 0,
    longestStreak: 0
  },
  earnedTrophies: {},
  isDataFetched: false
};

@State<SharedUserStateModel>({
  name: 'sharedUserState',
  defaults
})
@Injectable()
export class RootState implements NgxsOnInit{
  ngxsOnInit(ctx: StateContext<SharedUserStateModel>): void {}

  @Action(SetUserInformation)
  setUserInformation(ctx : StateContext<SharedUserStateModel>, { payload }: SetUserInformation) {
    ctx.setState(updateUserInfo(payload));
  }

  @Action(SetEarnedTrophiesAction)
  setEarnedTrophies({ patchState }: StateContext<SharedUserStateModel>, { payload }: SetEarnedTrophiesAction) {
    patchState({ earnedTrophies: payload });
  }

  @Action(SetReadingTimeForBook)
  updateReadingTimeForBookId(ctx : StateContext<SharedUserStateModel>, { payload }: SetReadingTimeForBook) {
    ctx.setState(updateReadingTimeForBook(payload));
  }
}
