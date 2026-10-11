/**
 * Times `topWords` and `uniqueBy` on fixed inputs (a seeded generator, so every run measures the same work) and prints
 * the median of five runs. `bun run bench` — compare the numbers before and after a change.
 */
import { topWords, uniqueBy } from '../src/text.ts'

function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

const random = seeded(42)
const vocabulary = Array.from({ length: 8000 }, (_, i) => `w${i.toString(36)}`)
// Zipf-like: a few words are common, most are rare, like real text.
const text = Array.from({ length: 60000 }, () => vocabulary[Math.floor(vocabulary.length * random() ** 3)]).join(' ')
const records = Array.from({ length: 20000 }, () => ({ id: Math.floor(random() * 10000) }))

function median(run: () => unknown): number {
  const times: number[] = []
  for (let i = 0; i < 5; i++) {
    const start = performance.now()
    run()
    times.push(performance.now() - start)
  }
  return times.sort((a, b) => a - b)[2]!
}

console.log(`topWords  60k words, 8k distinct: ${median(() => topWords(text, 20)).toFixed(1)} ms`)
console.log(`uniqueBy  20k records, 10k keys:  ${median(() => uniqueBy(records, (r) => r.id)).toFixed(1)} ms`)
