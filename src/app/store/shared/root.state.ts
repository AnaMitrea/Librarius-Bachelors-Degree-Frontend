import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { RootAction } from './root.actions';

export interface RootStateModel {
  items: string[];
}

const defaults = {
  items: []
};

@State<RootStateModel>({
  name: 'rootState',
  defaults
})
@Injectable()
export class RootState implements NgxsOnInit{
  ngxsOnInit(ctx: StateContext<any>): void {}

  @Action(RootAction)
  add({ getState, setState }: StateContext<RootStateModel>, { payload }: RootAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
  // @Action(RootAction)
  // add({ patchState }: StateContext<RootStateModel>, { payload }: RootAction) {
  //   patchState({ items: [ payload ] });
  // }
}
