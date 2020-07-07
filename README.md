# is-equal-type

![build status](https://github.com/kqito/is-equal-type/workflows/Node.js%20CI/badge.svg)

A module to deeply compare two values of an argument to evaluate if they are of the same type.

## Why use?
- You can easily verify that the JSON data you're getting from fetch API, for example, is really what you're expecting.
- By predefining the data you expect, you can clarify the specification like a document.

## Installation

## Usage
### General
You can verify the values as follows.

**NOTE: Only one value (type) can be specified in an array.**

```javascript
import isEqualType from "is-equal-type";

const successData = {
  status: 200,
  data: {
    message: "hello world",
    favorites: ["ts", "js", "react"],
  },
};

const failureData = {
  status: 200,
  data: {},
};

const expect = {
  status: 0,
  data: {
    message: "",
    favorites: [""],
  },
};

console.log(isEqualType(successData, expect));
// => true

console.log(isEqualType(failureData, expect));
// => false
```

### Any type
You can specify 'any' if you don't know what value to expect, or if you want to allow for more than one type.

Also, you can change the character that represents type any by specifying the 'anyType' option.

```javascript
import isEqualType from "is-equal-type";

const successData = {
  status: 200,
  data: {
    message: "hello world",
    favorites: ["ts", "js", "react"],
  },
};

const expect = {
  status: 0,
  data: "any",
};

console.log(isEqualType(successData, expect));
// => true
```

## Options
The following options can be set.

| Property | Type | Default | Description |
|-|:-:|:-:|-|
|deep|boolean \| undefined|true|Deeply compare objects and arrays.
|anyType|string \| undefined|'any'|Treats the specified string as type any.
|strictKeyChecks|boolean \| undefined|true|Check that the keys of the dictionary are the same.

## Support Type
This module can compare the following types.

- Boolean
- Null
- Undefined
- BigInt
- String
- Symbol
- Object(dictionary, array)

## License
[MIT © kqito](./LICENSE)
