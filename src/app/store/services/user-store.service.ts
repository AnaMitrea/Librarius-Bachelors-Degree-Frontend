import { Injectable } from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import * as Actions from "@app-store/shared/root.actions";
import {Trophies} from "@app-store/models/shared-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  // @ts-ignore
  @SelectSnapshot(({ sharedUserState }) => sharedUserState?.username)
  public username: any;

  // @ts-ignore
  @SelectSnapshot(({ sharedUserState }) => sharedUserState?.stats)
  public stats: any;

  // @ts-ignore
  @SelectSnapshot(({ sharedUserState }) => sharedUserState?.earnedTrophies)
  public userEarnedTrophies: any;

  // @ts-ignore
  @SelectSnapshot(({ sharedUserState }) => sharedUserState?.isDataFetched)
  public isDataFetched: any;

  // @ts-ignore
  @SelectSnapshot(({ sharedUserState }) => sharedUserState?.activity)
  public activity: any;

  constructor() { }

  @Dispatch()
  public setUserInformation(payload: any) {
    return new Actions.SetUserInformation(payload);
  }

  @Dispatch()
  public setEarnedTrophies(payload: Trophies) {
    return new Actions.SetEarnedTrophiesAction(payload);
  }

  @Dispatch()
  public updateReadingTimeForBook(payload: any) {
    return new Actions.SetReadingTimeForBook(payload);
  }

  @Dispatch()
  public resetStoreState(payload: any) {
    return new Actions.ResetStoreState(payload);
  }
}
