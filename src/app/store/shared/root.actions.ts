export class RootAction {
  static readonly type = '[Root] Add item';
  constructor(public payload: string) { }
}
