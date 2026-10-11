import { describe, expect, test } from 'bun:test'
import { chunk, topWords, uniqueBy, words } from '../src/text.ts'

describe('words', () => {
  test('lowercases and keeps apostrophes, digits and any script', () => {
    expect(words("It's 2 o'clock, ŽIVJO svet!")).toEqual(["it's", '2', "o'clock", 'živjo', 'svet'])
  })

  test('an empty or punctuation-only text has no words', () => {
    expect(words('')).toEqual([])
    expect(words(' ,.!? ')).toEqual([])
  })
})

describe('topWords', () => {
  test('counts and orders by frequency', () => {
    expect(topWords('b a b c b a', 2)).toEqual([
      ['b', 3],
      ['a', 2],
    ])
  })

  test('ties keep first-seen order', () => {
    expect(topWords('pear apple fig apple pear fig kiwi', 4)).toEqual([
      ['pear', 2],
      ['apple', 2],
      ['fig', 2],
      ['kiwi', 1],
    ])
  })

  test('is case-insensitive', () => {
    expect(topWords('Go go GO stop', 1)).toEqual([['go', 3]])
  })

  test('n beyond the distinct words returns them all; n of zero or less returns none', () => {
    expect(topWords('one two', 10)).toEqual([
      ['one', 1],
      ['two', 1],
    ])
    expect(topWords('one two', 0)).toEqual([])
    expect(topWords('one two', -3)).toEqual([])
  })
})

describe('uniqueBy', () => {
  test('keeps the first item for each key, in order', () => {
    const people = [
      { id: 2, name: 'Ana' },
      { id: 1, name: 'Ben' },
      { id: 2, name: 'Ana again' },
      { id: 3, name: 'Cy' },
    ]
    expect(uniqueBy(people, (p) => p.id).map((p) => p.name)).toEqual(['Ana', 'Ben', 'Cy'])
  })
})

describe('chunk', () => {
  test('splits into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  })
})
