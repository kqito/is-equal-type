import { evalType } from '../evalType';
import { primitiveData } from './data';

describe('evalType', () => {
  describe('Should be true', () => {
    primitiveData.forEach((testValue) => {
      it(`Should be true with ${String(testValue)} === ${String(
        testValue
      )}`, () => {
        expect(evalType(testValue, testValue)).toBe(true);
      });
    });
  });

  describe('Should be false', () => {
    primitiveData.forEach((testValue, testValueIndex) => {
      primitiveData.forEach((expectValue, expectIndex) => {
        if (testValueIndex === expectIndex) {
          return;
        }

        it(`Should be false with ${String(testValue)} === ${String(
          expectValue
        )}`, () => {
          expect(evalType(testValue, expectValue)).toBe(false);
        });
      });
    });
  });
});
