/** Lowercase words: runs of letters, digits and apostrophes, in any script. */
export function words(text: string): string[] {
  return text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []
}

/**
 * The `n` most frequent words of `text`, most frequent first, as `[word, count]` pairs. Words that occur equally often
 * keep the order in which they first appear.
 */
export function topWords(text: string, n: number): Array<[string, number]> {
  const counted: Array<[string, number]> = []
  for (const word of words(text)) {
    const entry = counted.find(([seen]) => seen === word)
    if (entry === undefined) counted.push([word, 1])
    else entry[1] += 1
  }
  return [...counted].sort((a, b) => b[1] - a[1]).slice(0, Math.max(0, n))
}

/** The items whose `key` was not seen before, in their original order. */
export function uniqueBy<T, K>(items: readonly T[], key: (item: T) => K): T[] {
  return items.filter((item, i) => items.findIndex((other) => key(other) === key(item)) === i)
}
