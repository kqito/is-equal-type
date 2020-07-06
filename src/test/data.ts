export const primitiveTests = [
  1,
  'string',
  false,
  null,
  undefined,
  Symbol('symbol'),
];

export const objectTests = [
  {},
  {
    key1: 1,
    key2: 'string',
    key3: false,
    key4: null,
    key5: undefined,
    key6: Symbol('symbol'),
    key7: {},
    key8: [],
  },
  {
    key1: {
      key2: {
        key3: 1,
      },
    },
  },
];

export const arrayTests = [
  [],
  ['string'],
  ['string', 1, null],
  [[], {}],
  [['string'], { key1: 1 }],
];

export const tests = [...primitiveTests, ...objectTests, ...arrayTests];
