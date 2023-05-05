import { Injectable } from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import * as Actions from "@app-store/shared/root.actions";
import {Trophies} from "@app-store/models/shared-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor() { }

  @Dispatch()
  public setEarnedTrophies(payload: Trophies) {
    return new Actions.SetEarnedTrophiesAction(payload);
  }
}
