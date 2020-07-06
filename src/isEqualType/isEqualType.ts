import { isObject, isPlainObject, isArray } from 'lodash';
import { assertObject, assertArray } from '../utils/assert';
import { checkEqualType } from '../utils/check';
import { Options, defaultOptions } from './options';

export const isEqualType = (
  target: unknown,
  expect: unknown,
  options?: Options
): boolean => {
  const mergedOptions = {
    ...options,
    ...defaultOptions,
  };

  const check = (value1: unknown, value2: unknown): boolean => {
    if (!checkEqualType(value1, value2)) {
      return false;
    }

    if (assertObject(value1) && assertObject(value2)) {
      const entriesValue1 = Object.entries(value1);
      const entriesValue2 = Object.entries(value2);
      if (entriesValue1.length !== entriesValue2.length) {
        return false;
      }

      const checkEqualTypes = entriesValue1.map(([, v]) => checkWrapper(v));
      return entriesValue2.every(([, v], index) => checkEqualTypes[index](v));
    }

    if (assertArray(value1) && assertArray(value2)) {
      if (value1.length !== value2.length) {
        return false;
      }

      const checkEqualTypes = value1.map((v) => checkWrapper(v));
      return value2.every((v, index) => checkEqualTypes[index](v));
    }

    return true;
  };

  const checkWrapper = (value1: unknown) => (value2: unknown) =>
    check(value1, value2);

  return check(target, expect);
};
