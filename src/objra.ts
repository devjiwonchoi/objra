/**
 *
 * @param regex matcher string or RegExp
 * @param str replacement string
 * @param obj source object
 * @example
 * import objectReplaceAll from 'objra'
 *
 * // Input:
 * objectReplaceAll('*', 'input', {
 *  './*': {
 *    types: './dist/*.d.ts',
 *    import: './dist/*.js',
 *  },
 * })
 *
 * // Output:
 * {
 *  './input': {
 *   types: './dist/input.d.ts',
 *   import: './dist/input.js',
 *  },
 * }
 *
 */
export default function objectReplaceAll(
  regex: string | RegExp,
  str: string,
  obj: object
): object {
  const regexp = typeof regex === 'string' ? regex : new RegExp(regex, 'g')
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof key === 'string') key = key.replace(regexp, str)
      if (value === null || value === undefined) value = str
      if (typeof value === 'string') return [key, value.replace(regexp, str)]
      return [key, objectReplaceAll(regexp, str, value)]
    })
  )
}
