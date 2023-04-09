import { Injectable } from '@angular/core';
import { UtilsLodashDecorator } from './utils-lodash-decorator';

@Injectable({
  providedIn: 'root'
})
export class Utils extends UtilsLodashDecorator {
  /* general */
  static type(val: any) {
    return Object.prototype.toString.call(val).slice(8, -1);
  }

  static formatNullValue(value: any, emptyCase: any) {
    return value || emptyCase;
  }

  /* objects */
  static isEmpty(obj: any): boolean {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
  }

  static getIntersection(arr1: any[], arr2: any[]): any[] | null {
    if (!(Array.isArray(arr1) && Array.isArray(arr2))) {
      return null;
    }

    return arr1.filter((arr1Val) => arr2.includes(arr1Val));
  }

  static insert(arr: any, index: any, newItem: any) {
    if (!arr) return null;
    return [...arr.slice(0, index), newItem, ...arr.slice(index)];
  }

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

  static prop(p: any, obj: any) {
    return this.path([p], obj);
  }

  static getObjectOrArrayLength(val: any) {
    if (Array.isArray(val)) return val.length;
    if (this.isObject(val)) return Object.keys(val).length;
    return 0;
  }

  static getLength(list: any): number {
    return list != null ? this.getObjectOrArrayLength(list) : NaN;
  }

  static isObject(obj: any) {
    return typeof obj === 'object' && !!obj;
  }

  static isFunction(fn: any) {
    return typeof fn === 'function';
  }

  /* strings */
  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  // @ts-ignore
  static toString(string: any = ''): string {
    return string ? string.toString() : '';
  }

  static toUpper(string = ''): string {
    return string ? String(string).toUpperCase() : string;
  }

  static toLower(string = ''): string {
    return string ? String(string).toLowerCase() : string;
  }

  static split(string = '', separator: any = ''): string[] {
    return string.split(separator);
  }

  static upperFirstLetter(string = ''): string {
    return this.toUpper(string.charAt(0)) + string.slice(1);
  }

  static lowerFirstLetter(string = ''): string {
    return this.toLower(string.charAt(0)) + string.slice(1);
  }

  static cleanBlanks(string = '', replaceWith: any = ''): string {
    return string.replace(/\s/g, replaceWith);
  }

  static replace(toReplace: any = '', replaceWith: any = '', string = ''): string {
    return string.replace(toReplace, replaceWith);
  }

  static replaceAll(toReplace: any = '', replaceWith: any = '', string = ''): string {
    return string.replace(new RegExp(toReplace, 'g'), replaceWith);
  }

  static contains(value: string | number, data: any): boolean {
    return !this.isEmpty(data) && data.includes(value);
  }

  static stringSort(a: any, b: any) {
    if (a === b) return 0;
    const arr = [a, b];
    arr.sort(new Intl.Collator('en').compare);
    const findAInSorted = arr.findIndex((i) => i === a);
    return findAInSorted !== 0 ? 1 : -1;
  }

  static interpolate(initialString: string, pieces: { [key: string]: string }): string {
    return Object.entries(pieces).reduce((result, [key, piece]) => result.split(`{${key}}`).join(piece), initialString);
  }
}

