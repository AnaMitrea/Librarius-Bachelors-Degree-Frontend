import {patch, StateOperator} from "@ngxs/store/operators";
import {SharedUserStateModel} from "@app-store/shared/root.state";

export const updateReadingTimeForBook = (payload: any): StateOperator<SharedUserStateModel> => {
  return patch<SharedUserStateModel>({
    activity: patch<SharedUserStateModel['activity']>({
      bookTimeTracker: patch<SharedUserStateModel['activity']['bookTimeTracker']>({
        ...payload
      })
    })
  })
};

export const updateUserInfo = (payload: any): StateOperator<SharedUserStateModel> => {
  return patch<SharedUserStateModel>({
    username: payload.username,
    stats: patch<SharedUserStateModel['stats']>({
      points: payload.points,
      level: payload.level
    })
  })
};
