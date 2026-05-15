import { test, expect } from "vitest"

import { Note } from "@shared/classes/Note"
import { getHour } from "@shared/utilities/clock"


test("getHour() works when alphabetical", () => {
  const isAlphabetical = true
  expect(
    getHour({ isAlphabetical, note: new Note({ value: -2 }) })
  ).toBe(
    10
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: -1 }) })
  ).toBe(
    5
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 0 }) })
  ).toBe(
    0
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 1 }) })
  ).toBe(
    7
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 2 }) })
  ).toBe(
    2
  )
})

test("getHour() works when not alphabetical", () => {
  const isAlphabetical = false
  expect(
    getHour({ isAlphabetical, note: new Note({ value: -2 }) })
  ).toBe(
    10
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: -1 }) })
  ).toBe(
    11
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 0 }) })
  ).toBe(
    0
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 1 }) })
  ).toBe(
    1
  )
  expect(
    getHour({ isAlphabetical, note: new Note({ value: 2 }) })
  ).toBe(
    2
  )
})
