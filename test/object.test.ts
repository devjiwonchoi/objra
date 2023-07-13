import objectReplaceAll from '../src/objra'

describe('objectReplaceAll', () => {
  it('should replace all occurrences of a string in an object', () => {
    expect(
      objectReplaceAll('*', 'input', {
        '.': {
          types: './dist/index.d.ts',
          import: './dist/index.js',
        },
        './*': {
          types: './dist/*.d.ts',
          import: './dist/*.js',
        },
      })
    ).toEqual({
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
      './input': {
        types: './dist/input.d.ts',
        import: './dist/input.js',
      },
    })
  })

  it('should replace all occurrences of a string mapped from an array inside an object', () => {
    const exports = {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
      './*': {
        types: './dist/*.d.ts',
        import: './dist/*.js',
      },
    }

    const filenames = ['input', 'button', 'checkbox', 'radio', 'select']

    const test = filenames.map((filename) =>
      objectReplaceAll('*', filename, exports)
    )

    const result = Object.assign({}, ...test)

    expect(result).toEqual({
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
      },
      './input': {
        types: './dist/input.d.ts',
        import: './dist/input.js',
      },
      './button': {
        types: './dist/button.d.ts',
        import: './dist/button.js',
      },
      './checkbox': {
        types: './dist/checkbox.d.ts',
        import: './dist/checkbox.js',
      },
      './radio': {
        types: './dist/radio.d.ts',
        import: './dist/radio.js',
      },
      './select': {
        types: './dist/select.d.ts',
        import: './dist/select.js',
      },
    })
  })

  it('should replace all null values in an object', () => {
    expect(
      objectReplaceAll(/null/, 'a', {
        a: null,
        b: 'b',
      })
    ).toEqual({
      a: 'a',
      b: 'b',
    })
  })
})
