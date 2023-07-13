# objra - Object.replaceAll()

Declarative `replaceAll` function for Objects

## Installation

```bash
npm i objra
```

## Usage

```ts
import objectReplaceAll from 'objra'

objectReplaceAll(regexp: string | RegExp, replacement: string, sourceObject: object)
```

**Note: The `replacement` will be available for `string[]` in the near future.**

## Real World Usage

Convert `nullish` values in object to given string.

```js
import objectReplaceAll from 'objra'

const response = fetch(/* ... */)
const data = response.json()

// Replace all null values with empty strings

const dataWithoutNulls = objectReplaceAll(null, '', data)
```

Replace `wildcard` values in object to given string.

```js
import objectReplaceAll from 'objra'

const config = {
  './*': {
    types: './dist/*.d.ts',
    import: './dist/*.js',
  },
}

// This will be simplified in the near future.
const filenames = ['button', 'input', 'checkbox']
const resolvedArray = filenames.map((filename) =>
  objectReplaceAll('*', filename, config)
)

const result = Object.assign({}, ...resolvedArray)

// Output:
// {
//   './button': {
//     types: './dist/button.d.ts',
//     import: './dist/button.js',
//   },
//   './input': {
//     types: './dist/input.d.ts',
//     import: './dist/input.js',
//   },
//   './checkbox': {
//     types: './dist/checkbox.d.ts',
//     import: './dist/checkbox.js',
//   },
// }
```
