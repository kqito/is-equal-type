import { isEqualType } from '../isEqualType';
import { primitiveData } from './data';

describe('isEqualType', () => {
  describe('Data', () => {
    describe('Array', () => {
      it('Should be verify with expect array value', () => {
        const targets = [['a'], ['a', 'b', 'c']];

        targets.forEach((test) => {
          expect(isEqualType(test, [''])).toBe(true);
          expect(isEqualType(test, [0])).toBe(false);
          expect(isEqualType(test, [])).toBe(false);
          expect(isEqualType(test, 'any')).toBe(true);

          // Two or more specifications expect false.
          expect(isEqualType(test, ['', 0])).toBe(false);
        });

        // If the array is empty, then it must be true.
        expect(isEqualType([], [])).toBe(true);
        expect(isEqualType([], [''])).toBe(true);
        expect(isEqualType([], [0])).toBe(true);

        // Object pattern
        expect(isEqualType([{}], [{}])).toBe(true);
        expect(isEqualType([{ key: '' }], [{ key: '' }])).toBe(true);
        expect(
          isEqualType(
            [
              {
                key1: {
                  key2: '',
                },
              },
            ],
            [
              {
                key1: {
                  key2: '',
                },
              },
            ]
          )
        ).toBe(true);
        expect(
          isEqualType(
            [
              {
                key1: {
                  key2: ['a', 'b', 'c'],
                },
              },
            ],
            [
              {
                key1: {
                  key2: [''],
                },
              },
            ]
          )
        ).toBe(true);
        expect(isEqualType([{}], [[]])).toBe(false);
        expect(isEqualType([{ key: '' }], [{ key: 0 }])).toBe(false);
        expect(
          isEqualType(
            [
              {
                key1: {
                  key2: '',
                },
              },
            ],
            [
              {
                key1: {
                  key2: null,
                },
              },
            ]
          )
        ).toBe(false);
        expect(
          isEqualType(
            [
              {
                key1: {
                  key2: ['a', 'b', 'c'],
                },
              },
            ],
            [
              {
                key1: {
                  key2: [0],
                },
              },
            ]
          )
        ).toBe(false);
      });
    });
    expect(isEqualType([{ key: null }], [{ key: 'any' }])).toBe(true);

    describe('Object', () => {
      it('Should be verify with expect object value', () => {
        const targets = [
          { key1: '' },
          { key1: '', key2: 0 },
          { key1: { key2: '' } },
        ];

        targets.forEach((test) => {
          expect(isEqualType(test, test)).toBe(true);
          expect(isEqualType(test, {})).toBe(false);
          expect(isEqualType(test, { key1: 0 })).toBe(false);
          expect(isEqualType(test, 'any')).toBe(true);

          // Two or more specifications expect false.
          expect(isEqualType(test, { key1: '', key2: '', key3: '' })).toBe(
            false
          );
        });

        // Empty object
        expect(isEqualType({}, {})).toBe(true);
        expect(isEqualType({}, { key1: '' })).toBe(false);

        // Nested object
        expect(
          isEqualType({ key1: { key2: '' } }, { key1: { key2: '' } })
        ).toBe(true);
        expect(
          isEqualType({ key1: { key2: '' } }, { key1: { key2: 'any' } })
        ).toBe(true);
        expect(isEqualType({ key1: { key2: '' } }, { key1: { key2: 0 } })).toBe(
          false
        );
        expect(
          isEqualType({ key1: { key2: '' } }, { key1: { key2: '', key3: '' } })
        ).toBe(false);
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
