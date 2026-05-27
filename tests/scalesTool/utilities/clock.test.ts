import { test, expect } from "vitest"
import { getDerivedFromState } from "../../../test-utilities/getDerivedFromState"

import { Note } from "@scalesTool/classes/Note"
import { buildInclusiveRange } from "@scalesTool/utilities/array"
import { getCurrentHour, getNextHour } from "@scalesTool/utilities/clock"
import { Motion } from "@scalesTool/utilities/motion"
import { getInitialState } from "@scalesTool/utilities/state"


test("getCurrentHour() works when arranging ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ArrangeDucks,
    areDucksInARow: false,
    root: 0,
    degree: 0,
  })
  expect(
    buildInclusiveRange(-3, 3).map(
      (value) => getCurrentHour(derived, new Note({ value }))
    )
  ).toStrictEqual(
    [3, 10, 5, 0, 7, 2, 9]
  )
})

test("getCurrentHour() works when exploding ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ExplodeDucks,
    areDucksInARow: true,
    root: 0,
    degree: 0,
  })
  expect(
    buildInclusiveRange(-3, 3).map(
      (value) => getCurrentHour(derived, new Note({ value }))
    )
  ).toStrictEqual(
    [9, 10, 11, 0, 1, 2, 3]
  )
})

test("getNextHour() works when arranging ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ArrangeDucks,
    areDucksInARow: false,
    root: 0,
    degree: 0,
  })
  expect(
    buildInclusiveRange(-3, 3).map(
      (value) => getNextHour(derived, new Note({ value }))
    )
  ).toStrictEqual(
    [9, 10, 11, 0, 1, 2, 3]
  )
})

test("getNextHour() works when exploding ducks", () => {
  const derived = getDerivedFromState({
    ...getInitialState(),
    motion: Motion.ExplodeDucks,
    areDucksInARow: true,
    root: 0,
    degree: 0,
  })
  expect(
    buildInclusiveRange(-3, 3).map(
      (value) => getNextHour(derived, new Note({ value }))
    )
  ).toStrictEqual(
    [3, 10, 5, 0, 7, 2, 9]
  )
})
