import { assertObject, assertArray } from '../utils/assert';
import { evalType } from './evalType';
import { Options, defaultOptions } from './options';

/**
 * Deeply compare two values of an argument to evaluate if they are of the same type.
 *
 * @param target The value to compare.
 * @param expect The expected value.
 * @param options The options for comparsion.
 * @returns Returns true if the two values are the same type, false otherwise.
 * @example
 *
 * const target = {
 *   status: 200,
 *   data: {
 *     message: "hello world",
 *   },
 * };
 *
 * const expect = {
 *   status: 0,
 *   data: {
 *     message: "",
 *   },
 * };
 *
 * console.log(isEqualType(target, expect));
 * // => true
 */
export const isEqualType = (
  target: unknown,
  expect: unknown,
  options?: Options
): boolean => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const { deep, anyType } = mergedOptions;

  const check = (targetValue: unknown, expectValue: unknown): boolean => {
    if (expectValue === anyType) {
      return true;
    }

    if (!evalType(targetValue, expectValue, mergedOptions)) {
      return false;
    }

    if (assertObject(targetValue) && assertObject(expectValue)) {
      const entriesTargetValue = Object.entries(targetValue);
      const entriesExpectValue = Object.entries(expectValue);
      if (entriesTargetValue.length !== entriesExpectValue.length) {
        return false;
      }

      const checkEqualTypes = entriesTargetValue.map(([, v]) =>
        checkWrapper(v)
      );
      return entriesExpectValue.every(([, v], index) =>
        checkEqualTypes[index](v)
      );
    }

    if (assertArray(targetValue) && assertArray(expectValue)) {
      if (targetValue.length !== expectValue.length) {
        return false;
      }

      const checkEqualTypes = targetValue.map((v) => checkWrapper(v));
      return expectValue.every((v, index) => checkEqualTypes[index](v));
    }

    return true;
  };

  const checkWrapper = (targetValue: unknown) => (expectValue: unknown) => {
    return deep
      ? check(targetValue, expectValue)
      : evalType(targetValue, expectValue, mergedOptions);
  };

  return check(target, expect);
};
