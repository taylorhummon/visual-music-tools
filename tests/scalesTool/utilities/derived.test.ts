import { test, expect } from "vitest"
import { getDerivedFromState } from "../../../test-utilities/getDerivedFromState"

import { AnimationOption } from "@scalesTool/utilities/clock"
import { Motion } from "@scalesTool/utilities/motion"


test("useDerived() works", () => {
  const derived = getDerivedFromState({
    isUsingDegreeSpotlight: false,
    isUsingSolfege: true,
    isAnchoringRoot: false,
    isUsingAnimation: true,
    animationOption: AnimationOption.Ballet,
    motion: Motion.IncrementDegree,
    root: 2,
    degree: 3,
    areDucksInARow: false,
  })
  expect(
    derived.clockSettings.isUsingDegreeSpotlight
  ).toBe(
    false
  )
  expect(
    derived.clockSettings.isUsingSolfege
  ).toBe(
    true
  )
  expect(
    derived.clockSettings.isAnchoringRoot
  ).toBe(
    false
  )
  expect(
    derived.clockSettings.isUsingAnimation
  ).toBe(
    true
  )
  expect(
    derived.clockSettings.animationOption
  ).toBe(
    AnimationOption.Ballet
  )
  expect(
    derived.motion
  ).toBe(
    Motion.IncrementDegree
  )
  expect(
    derived.currentMusicalKey.root
  ).toBe(
    2
  )
  expect(
    derived.currentMusicalKey.degree
  ).toBe(
    3
  )
  expect(
    derived.nextMusicalKey.root
  ).toBe(
    2
  )
  expect(
    derived.nextMusicalKey.degree
  ).toBe(
    4
  )
  expect(
    derived.currentAreDucksInARow
  ).toBe(
    false
  )
  expect(
    derived.nextAreDucksInARow
  ).toBe(
    false
  )
})
