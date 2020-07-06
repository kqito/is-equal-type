import { isEqualType } from '../isEqualType';
import { tests } from './data';

describe('isEqualType', () => {
  describe('Default options', () => {
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

  describe('"anyType" option', () => {
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

  describe('"deep" option', () => {
    const targetValue = {
      key1: {
        key2: 'hi',
        key3: 'hi',
      },
    };

    const expectValue = {
      key1: {},
    };

    it('Should be false when deep option is true', () => {
      expect(isEqualType(targetValue, expectValue)).toBe(false);
    });

    it('Should be true when deep option is false', () => {
      expect(isEqualType(targetValue, expectValue, { deep: false })).toBe(true);
    });
  });
});
