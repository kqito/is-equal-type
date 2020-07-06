import { isPlainObject, isArray } from 'lodash';

export const assertObject = (
  target: unknown
): target is Record<string, unknown> => {
  return isPlainObject(target);
};

export const assertArray = (target: unknown): target is unknown[] => {
  return isArray(target);
};
