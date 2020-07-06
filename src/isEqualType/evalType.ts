import { isObject, isPlainObject, isArray, isNull } from 'lodash';
import { Options } from './options';

export const evalType = (
  target: unknown,
  expect: unknown,
  options?: Options
): boolean => {
  if (options && options.anyType === expect) {
    return true;
  }

  if (
    !isObject(target) &&
    !isObject(expect) &&
    target !== null &&
    isObject !== null
  ) {
    return typeof target === typeof expect;
  }

  // nullでないかつobjectの場合
  return (
    (isNull(target) && isNull(expect)) ||
    (isPlainObject(target) && isPlainObject(expect)) ||
    (isArray(target) && isArray(expect))
  );
};
