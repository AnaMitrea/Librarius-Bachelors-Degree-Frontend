import {Trophies} from "@app-store/models/shared-user.model";

export class SetEarnedTrophiesAction {
  static readonly type = '[Shared] Set Earned Trophies';
  constructor(public payload: Trophies) { }
}

export class SetReadingTimeForBook {
  static readonly type = '[Shared] Reading time tracker';
  constructor(public payload: any) { }
}
