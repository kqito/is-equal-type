import { assertObject, assertArray } from '../utils/assert';
import { evalType } from './evalType';
import { Options, defaultOptions } from './options';

type ValueHandler = (targetValue: unknown) => (expectValue: unknown) => boolean;

/**
 * Deeply compare two values of an argument to evaluate if they are of the same type.
 *
 * @param target The value to compare.
 * @param expect The expected value.
 * @param options The options for comparsion.
 * @returns Returns true if the two values are the same type, false otherwise.
 * @example
 *
 * import isEqualType from "is-equal-type";
 *
 * const successData = {
 *   status: 200,
 *   data: {
 *     message: "hello world",
 *     favorites: ["ts", "js", "react"],
 *   },
 * };
 *
 * const failureData = {
 *   status: 200,
 *   data: {},
 * };
 *
 * const expect = {
 *   status: 0,
 *   data: {
 *     message: "",
 *     favorites: [""],
 *   },
 * };
 *
 * console.log(isEqualType(successData, expect));
 * // => true
 *
 * console.log(isEqualType(failureData, expect));
 * // => false
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

  const valueHandler: ValueHandler = (targetValue: unknown) => (
    expectValue: unknown
  ) => {
    return mergedOptions.deep
      ? check(targetValue, expectValue)
      : evalType(targetValue, expectValue, mergedOptions);
  };

  const check = (targetValue: unknown, expectValue: unknown): boolean => {
    if (assertObject(targetValue) && assertObject(expectValue)) {
      return expandObject(
        targetValue,
        expectValue,
        valueHandler,
        mergedOptions
      );
    }

    if (assertArray(targetValue) && assertArray(expectValue)) {
      return expandArray(targetValue, expectValue, valueHandler);
    }

    return evalType(targetValue, expectValue, mergedOptions);
  };

  return check(target, expect);
};

const expandObject = (
  targetValue: Record<string, unknown>,
  expectValue: Record<string, unknown>,
  valueHandler: ValueHandler,
  options: Options
) => {
  const entriesTargetValue = Object.entries(targetValue);
  const entriesExpectValue = Object.entries(expectValue);
  if (entriesTargetValue.length !== entriesExpectValue.length) {
    return false;
  }

  // not check the key of the object
  if (!options.strictKeyChecks) {
    const checkEqualTypes = entriesTargetValue.map(([, v]) => valueHandler(v));
    return entriesExpectValue.every(([, v], index) =>
      checkEqualTypes[index](v)
    );
  }

  const checkKeys = (key1: string) => (key2: string) => key1 === key2;
  const checkEqualObject = entriesTargetValue.map(([key, value]) => ({
    checkKey: checkKeys(key),
    checkType: valueHandler(value),
  }));

  return entriesExpectValue.every(([k, v], index) => {
    const { checkKey, checkType } = checkEqualObject[index];
    return checkKey(k) && checkType(v);
  });
};

const expandArray = (
  targetValue: unknown[],
  expectValue: unknown[],
  valueHandler: ValueHandler
) => {
  if (targetValue.length === 0) {
    return true;
  }

  // Only one type can be specified in an array
  if (expectValue.length !== 1) {
    return false;
  }

  return targetValue.every((v) => valueHandler(v)(expectValue[0]));
};
