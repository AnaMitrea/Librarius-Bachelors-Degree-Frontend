import {
  get,
  isNil,
  isNaN,
  isDate,
  isNumber,
  has
} from 'lodash';

export abstract class UtilsLodashDecorator {
  static get(path: string[] | string, obj: any) {
    return get(obj, path);
  }

  static isNil(value: any) {
    return isNil(value);
  }

  static isNaN(value: any) {
    return isNaN(value)
  }

  static isDate(date: any) {
    return isDate(date);
  }

  static isNumber(value: unknown): boolean {
    return isNumber(value);
  }

  static has(obj: any, prop: string[] | string) {
    return has(obj, prop)
  }
}
