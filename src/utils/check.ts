import { isObject, isPlainObject, isArray, isNull } from 'lodash';

export const checkEqualType = (target: unknown, expect: unknown): boolean => {
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
