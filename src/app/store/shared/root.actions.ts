import {Trophies} from "@app-store/models/shared-user.model";

export class SetEarnedTrophiesAction {
  static readonly type = '[Shared] Set Earned Trophies';
  constructor(public payload: Trophies) { }
}

export class SetReadingTimeForBook {
  static readonly type = '[Shared] Reading time tracker';
  constructor(public payload: any) { }
}

export class SetUserInformation {
  static readonly type = '[Shared] Set User information';
  constructor(public payload: any) { }
}

export class ResetStoreState {
  static readonly type = '[Shared] ResetStoreState';
  constructor(public payload: any) { }
}
