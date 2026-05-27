import { test, expect } from "vitest"
import { getDerivedFromState } from "../../../test-utilities/getDerivedFromState"

import { DotAnimator } from "@scalesTool/classes/DotAnimator"
import { getCurrentHour } from "@scalesTool/utilities/clock"
import { type Derived } from "@scalesTool/utilities/derived"
import { Motion } from "@scalesTool/utilities/motion"
import { SOLFEGE_LETTERS } from "@scalesTool/utilities/solfege"
import { getInitialState } from "@scalesTool/utilities/state"


function noMotion(
  derived: Derived,
): Array<number> {
  return SOLFEGE_LETTERS.map(
    (solfegeLetter) => {
      const note = derived.currentMusicalKey.noteFromSolfegeLetter(solfegeLetter)
      const startHour = getCurrentHour(derived, note)
      return startHour
    }
  )
}

function exerciseAnimator(
  derived: Derived,
  animator: DotAnimator,
): Array<number> {
  return SOLFEGE_LETTERS.map(
    (solfegeLetter) => {
      const note = derived.currentMusicalKey.noteFromSolfegeLetter(solfegeLetter)
      const startHour = getCurrentHour(derived, note)
      return animator.getFinishHour(startHour, note.naturalNote, solfegeLetter)
    }
  )
}


test("DotAnimator works when still and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.Still,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
})

test("DotAnimator works when incrementing root and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementRoot,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
})

test("DotAnimator works when decrementing root and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementRoot,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
})

test("DotAnimator works when incrementing degree and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementDegree,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 11, 0 ]
  )
})

test("DotAnimator works when decrementing degree and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementDegree,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 3, 5, 7, 9, 10, 0 ]
  )
})

test("DotAnimator works when incrementing both and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementDegree,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 11, 0 ]
  )
})

test("DotAnimator works when decrementing both and ducks are not in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementDegree,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 3, 5, 7, 9, 10, 0 ]
  )
})

test("DotAnimator works when arranging ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ArrangeDucks,
    areDucksInARow: false,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
})

test("DotAnimator works when still and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.Still,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
})

test("DotAnimator works when incrementing root and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementRoot,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
})

test("DotAnimator works when decrementing root and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementRoot,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
})

test("DotAnimator works when incrementing degree and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementDegree,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 3, 5, 0, 2, 4, 11, 1 ]
  )
})

test("DotAnimator works when decrementing degree and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementDegree,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 1, 3, 10, 0, 2, 9, 11 ]
  )
})

test("DotAnimator works when incrementing both and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.IncrementDegree,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 3, 5, 0, 2, 4, 11, 1 ]
  )
})

test("DotAnimator works when decrementing both and ducks are in a row", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.DecrementDegree,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 1, 3, 10, 0, 2, 9, 11 ]
  )
})

test("DotAnimator works when exploding ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ExplodeDucks,
    areDucksInARow: true,
    root: 2,
    degree: 1,
  })
  const animator = new DotAnimator({ derived })
  expect(
    noMotion(derived)
  ).toStrictEqual(
    [ 2, 4, 11, 1, 3, 10, 0 ]
  )
  expect(
    exerciseAnimator(derived, animator)
  ).toStrictEqual(
    [ 2, 4, 5, 7, 9, 10, 0 ]
  )
})
