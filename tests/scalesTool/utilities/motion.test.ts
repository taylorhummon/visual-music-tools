import { test, expect } from "vitest"

import { MusicalKey } from "@scalesTool/classes/MusicalKey"
import {
  Motion,
  canPerformMotion,
  getNextMusicalKey,
  getNextAreDucksInARow,
  getWillIncrementMode,
  getWillDecrementMode,
  getWillIncrementRoot,
  getWillDecrementRoot,
  getWillIncrementDegree,
  getWillDecrementDegree,
} from "@scalesTool/utilities/motion"


const maxDegree = 14
const minDegree = -14


test("canPerformMotion() works for Dorian D", () => {
  const musicalKey = new MusicalKey({ mode: 0, root: 0 })
  expect(
    canPerformMotion({ motion: Motion.IncrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
})

test("canPerformMotion() works for 14 sharps", () => {
  const musicalKey = new MusicalKey({ mode: -2, degree: 14 })
  expect(
    canPerformMotion({ motion: Motion.IncrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
})

test("canPerformMotion() works for 14 flats", () => {
  const musicalKey = new MusicalKey({ mode: -1, degree: -14 })
  expect(
    canPerformMotion({ motion: Motion.IncrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
})

test("canPerformMotion() works for mode = -3", () => {
  const musicalKey = new MusicalKey({ mode: -3, root: 2 })
  expect(
    canPerformMotion({ motion: Motion.IncrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementRoot, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    false
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementDegree, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.IncrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
  expect(
    canPerformMotion({ motion: Motion.DecrementBoth, musicalKey, maxDegree, minDegree })
  ).toBe(
    true
  )
})

test("getNextMusicalKey() works", () => {
  const currentMusicalKey = new MusicalKey({ mode: 0, root: 0 })
  expect(
    getNextMusicalKey({ motion: Motion.IncrementRoot, currentMusicalKey }).root
  ).toBe(
    1
  )
  expect(
    getNextMusicalKey({ motion: Motion.IncrementRoot, currentMusicalKey }).degree
  ).toBe(
    0
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementRoot, currentMusicalKey }).root
  ).toBe(
    -1
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementRoot, currentMusicalKey }).degree
  ).toBe(
    0
  )
  expect(
    getNextMusicalKey({ motion: Motion.IncrementDegree, currentMusicalKey }).root
  ).toBe(
    0
  )
  expect(
    getNextMusicalKey({ motion: Motion.IncrementDegree, currentMusicalKey }).degree
  ).toBe(
    1
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementDegree, currentMusicalKey }).root
  ).toBe(
    0
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementDegree, currentMusicalKey }).degree
  ).toBe(
    -1
  )
  expect(
    getNextMusicalKey({ motion: Motion.IncrementBoth, currentMusicalKey }).root
  ).toBe(
    1
  )
  expect(
    getNextMusicalKey({ motion: Motion.IncrementBoth, currentMusicalKey }).degree
  ).toBe(
    1
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementBoth, currentMusicalKey }).root
  ).toBe(
    -1
  )
  expect(
    getNextMusicalKey({ motion: Motion.DecrementBoth, currentMusicalKey }).degree
  ).toBe(
    -1
  )
})

test("getNextAreDucksInARow() works", () => {
  expect(
    getNextAreDucksInARow({ motion: Motion.ArrangeDucks, currentAreDucksInARow: false })
  ).toBe(
    true
  )
  expect(
    getNextAreDucksInARow({ motion: Motion.ExplodeDucks, currentAreDucksInARow: true })
  ).toBe(
    false
  )
  expect(
    getNextAreDucksInARow({ motion: Motion.DecrementBoth, currentAreDucksInARow: false })
  ).toBe(
    false
  )
  expect(
    getNextAreDucksInARow({ motion: Motion.DecrementBoth, currentAreDucksInARow: true })
  ).toBe(
    true
  )
})

test("getWillIncrementMode() works", () => {
  expect(
    getWillIncrementMode(Motion.IncrementRoot)
  ).toBe(
    true
  )
  expect(
    getWillIncrementMode(Motion.IncrementDegree)
  ).toBe(
    false
  )
  expect(
    getWillIncrementMode(Motion.IncrementBoth)
  ).toBe(
    false
  )
  expect(
    getWillIncrementMode(Motion.DecrementRoot)
  ).toBe(
    false
  )
  expect(
    getWillIncrementMode(Motion.DecrementDegree)
  ).toBe(
    true
  )
  expect(
    getWillIncrementMode(Motion.DecrementBoth)
  ).toBe(
    false
  )
})

test("getWillDecrementMode() works", () => {
  expect(
    getWillDecrementMode(Motion.IncrementRoot)
  ).toBe(
    false
  )
  expect(
    getWillDecrementMode(Motion.IncrementDegree)
  ).toBe(
    true
  )
  expect(
    getWillDecrementMode(Motion.IncrementBoth)
  ).toBe(
    false
  )
  expect(
    getWillDecrementMode(Motion.DecrementRoot)
  ).toBe(
    true
  )
  expect(
    getWillDecrementMode(Motion.DecrementDegree)
  ).toBe(
    false
  )
  expect(
    getWillDecrementMode(Motion.DecrementBoth)
  ).toBe(
    false
  )
})

test("getWillIncrementRoot() works", () => {
  expect(
    getWillIncrementRoot(Motion.IncrementRoot)
  ).toBe(
    true
  )
  expect(
    getWillIncrementRoot(Motion.IncrementDegree)
  ).toBe(
    false
  )
  expect(
    getWillIncrementRoot(Motion.IncrementBoth)
  ).toBe(
    true
  )
})

test("getWillDecrementRoot() works", () => {
  expect(
    getWillDecrementRoot(Motion.DecrementRoot)
  ).toBe(
    true
  )
  expect(
    getWillDecrementRoot(Motion.DecrementDegree)
  ).toBe(
    false
  )
  expect(
    getWillDecrementRoot(Motion.DecrementBoth)
  ).toBe(
    true
  )
})

test("getWillIncrementDegree() works", () => {
  expect(
    getWillIncrementDegree(Motion.IncrementRoot)
  ).toBe(
    false
  )
  expect(
    getWillIncrementDegree(Motion.IncrementDegree)
  ).toBe(
    true
  )
  expect(
    getWillIncrementDegree(Motion.IncrementBoth)
  ).toBe(
    true
  )
})

test("getWillDecrementDegree() works", () => {
  expect(
    getWillDecrementDegree(Motion.DecrementRoot)
  ).toBe(
    false
  )
  expect(
    getWillDecrementDegree(Motion.DecrementDegree)
  ).toBe(
    true
  )
  expect(
    getWillDecrementDegree(Motion.DecrementBoth)
  ).toBe(
    true
  )
})
