# is-equal-type

A module to deeply compare two values of an argument to evaluate if they are of the same type.

## Why use? 
- You can easily verify that the data you're getting from a fetch API, for example, is really what you're expecting.
- By predefining the data you expect, you can clarify the specification like a document.

## Installation

## Usage
```javascript

```

## Options
The following options can be set.

| Property | Type | Default | Description |
|-|:-:|:-:|-|
|deep|boolean \| undefined|true|Deeply compare objects, arrays, etc.
|anyType|string \| undefined|'any'|Treats the specified string as type any.

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
