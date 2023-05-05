import { Injectable } from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import * as Actions from "@app-store/shared/root.actions";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor() { }

  @Dispatch()
  public addData(payload: any) {
    return new Actions.RootAction(payload);
  }
}
