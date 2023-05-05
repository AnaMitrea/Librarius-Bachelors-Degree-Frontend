import {Trophies} from "@app-store/models/shared-user.model";

export const transformEarnedTrophiesData = (data: any): Trophies => {
  return data.reduce((acc: any, curr: any) => {
    const newObj = {
      [curr.key]: curr.value
    };
    acc.push(newObj);
    return acc;
  }, []);
}
