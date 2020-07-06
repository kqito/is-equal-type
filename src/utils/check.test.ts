import { checkEqualType } from './check';
import { primitiveTests, objectTests, arrayTests, tests } from '../test/data';

describe('check util', () => {
  describe('Should be true', () => {
    tests.forEach((testValue) => {
      it(`Should be true with ${String(testValue)} === ${String(
        testValue
      )}`, () => {
        expect(checkEqualType(testValue, testValue)).toBe(true);
      });
    });

    objectTests.forEach((testValue, testValueIndex) => {
      objectTests.forEach((expectValue, expectIndex) => {
        if (testValueIndex === expectIndex) {
          return;
        }

        it(`Should be true with ${String(testValue)} === ${String(
          expectValue
        )}`, () => {
          expect(checkEqualType(testValue, expectValue)).toBe(true);
        });
      });
    });

    arrayTests.forEach((testValue, testValueIndex) => {
      arrayTests.forEach((expectValue, expectIndex) => {
        if (testValueIndex === expectIndex) {
          return;
        }

        it(`Should be true with ${String(testValue)} === ${String(
          expectValue
        )}`, () => {
          expect(checkEqualType(testValue, expectValue)).toBe(true);
        });
      });
    });
  });

  describe('Should be false', () => {
    primitiveTests.forEach((testValue, testValueIndex) => {
      primitiveTests.forEach((expectValue, expectIndex) => {
        if (testValueIndex === expectIndex) {
          return;
        }

        it(`Should be false with ${String(testValue)} === ${String(
          expectValue
        )}`, () => {
          expect(checkEqualType(testValue, expectValue)).toBe(false);
        });
      });
    });
  });
});
