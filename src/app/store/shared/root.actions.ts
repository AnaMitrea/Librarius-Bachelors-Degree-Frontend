import {Trophies} from "@app-store/models/shared-user.model";

export class SetEarnedTrophiesAction {
  static readonly type = '[Shared] Set Earned Trophies';
  constructor(public payload: Trophies) { }
}
