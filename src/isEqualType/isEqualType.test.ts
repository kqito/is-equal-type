import { isEqualType } from './isEqualType';
import { tests } from '../test/data';

describe('isEqualType', () => {
  describe('Should check test data', () => {
    tests.forEach((test) => {
      it(`Should be true with ${String(test)}`, () => {
        expect(isEqualType(test, test)).toBe(true);
      });
    });

    tests.forEach((testValue, testIndex) => {
      tests.forEach((expectValue, expectIndex) => {
        if (testIndex === expectIndex) {
          return;
        }

        it(`Should be false with ${String(test)} === ${String(
          expectValue
        )}`, () => {
          expect(isEqualType(testValue, expectValue)).toBe(false);
        });
      });
    });
  });

  describe('Should return true when expect value is "any"', () => {
    tests.forEach((test) => {
      it(`Should be true with ${String(test)}`, () => {
        expect(isEqualType(test, 'any', { anyType: 'any' })).toBe(true);
      });
    });

    tests.forEach((test) => {
      it(`Should be true with ${String(test)}`, () => {
        expect(isEqualType(test, 'anyType', { anyType: 'anyType' })).toBe(true);
      });
    });
  });
});
