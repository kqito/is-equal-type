import { isEqualType } from '../isEqualType';
import { primitiveData } from './data';

describe('isEqualType', () => {
  describe('Data', () => {
    describe('Array', () => {
      it('Should be true with expect array value', () => {
        const targets = [['a'], ['a', 'b', 'c']];

        targets.forEach((test) => {
          expect(isEqualType(test, [''])).toBe(true);
          expect(isEqualType(test, [0])).toBe(false);
          expect(isEqualType(test, [])).toBe(false);

          // Two or more specifications expect false.
          expect(isEqualType(test, ['', 0])).toBe(false);
        });

        // If the array is empty, then it must be true.
        expect(isEqualType([], [])).toBe(true);
        expect(isEqualType([], [''])).toBe(true);
        expect(isEqualType([], [0])).toBe(true);
      });
    });
  });

  describe('Option', () => {
    describe('Default options', () => {
      primitiveData.forEach((test) => {
        it(`Should be true with ${String(test)}`, () => {
          expect(isEqualType(test, test)).toBe(true);
        });
      });

      primitiveData.forEach((testValue, testIndex) => {
        primitiveData.forEach((expectValue, expectIndex) => {
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
      primitiveData.forEach((test) => {
        it(`Should be true with ${String(test)}`, () => {
          expect(isEqualType(test, 'any', { anyType: 'any' })).toBe(true);
        });
      });

      primitiveData.forEach((test) => {
        it(`Should be true with ${String(test)}`, () => {
          expect(isEqualType(test, 'anyType', { anyType: 'anyType' })).toBe(
            true
          );
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
        expect(isEqualType(targetValue, expectValue, { deep: false })).toBe(
          true
        );
      });
    });
  });
});
