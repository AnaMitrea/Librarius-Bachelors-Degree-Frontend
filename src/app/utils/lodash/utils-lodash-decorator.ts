import {
  cloneDeep,
  concat,
  get,
  isEqual,
  isNil,
  isNaN,
  orderBy,
  isDate,
  isNumber,
  isFinite,
  last,
  has,
  capitalize,
  pick
} from 'lodash';

export abstract class UtilsLodashDecorator {
  static get(path: string[] | string, obj: any) {
    return get(obj, path);
  }

  static orderBy(collection: any, propertyCallback: any, orders: ['asc']) {
    return orderBy(collection, propertyCallback, orders);
  }

  static clone(value: any) {
    return cloneDeep(value);
  }

  static deepEqual(value: any, other: any) {
    return isEqual(value, other);
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

  static concat(arr1: any[], arr2: any[], ...others: any[]) {
    return concat(arr1, arr2, ...others);
  }

  static isFinite(value: any) {
    return isFinite(value);
  }

  static last(value: any[]) {
    return last(value);
  }

  static has(obj: any, prop: string[] | string) {
    return has(obj, prop)
  }

  static capitalize(string: string) {
    return capitalize(string);
  }

  static pick(obj: any, array: string[]) {
    return pick(obj, array);
  }
}
