import { isEqualType } from './isEqualType';
import { Options } from './options';
import { tests } from '../test/data';

describe('isEqualType', () => {
  describe('Should check test data', () => {
    const options: Options = {
      deep: true,
    };

    tests.forEach((test) => {
      it(`Should be true with ${String(test)}`, () => {
        expect(isEqualType(test, test, options)).toBe(true);
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
});
