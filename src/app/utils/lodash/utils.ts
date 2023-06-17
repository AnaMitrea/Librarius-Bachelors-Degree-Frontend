import { Injectable } from '@angular/core';
import { UtilsLodashDecorator } from './utils-lodash-decorator';

@Injectable({
  providedIn: 'root'
})
export class Utils extends UtilsLodashDecorator {
  static path(paths: string[], obj: any) {
    let val = obj;
    let idx = 0;
    while (idx < paths.length) {
      if (this.isNil(val)) return;
      val = val[paths[idx]];
      idx += 1;
    }
    return val;
  }
}

