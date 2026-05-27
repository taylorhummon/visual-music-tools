import { test, expect } from "vitest"

import { getInitialState, reducer } from "@scalesTool/utilities/state"

import { MusicalKey } from "@scalesTool/classes/MusicalKey"
import { ActionType } from "@scalesTool/utilities/action"
import { AnimationOption } from "@scalesTool/utilities/clock"
import { Motion } from "@scalesTool/utilities/motion"


test("reducer() works", () => {
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.SelectIsUsingDegreeSpotlight,
        isUsingDegreeSpotlight: true
      },
    ).isUsingDegreeSpotlight
  ).toBe(
    true
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.SelectIsUsingSolfege,
        isUsingSolfege: true
      },
    ).isUsingSolfege
  ).toBe(
    true
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.SelectIsAnchoringRoot,
        isAnchoringRoot: true
      },
    ).isAnchoringRoot
  ).toBe(
    true
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.SelectIsUsingAnimation,
        isUsingAnimation: false
      },
    ).isUsingAnimation
  ).toBe(
    false
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.SelectAnimationOption,
        animationOption: AnimationOption.Ballet
      },
    ).animationOption
  ).toBe(
    AnimationOption.Ballet
  )
  expect(
    reducer(
      getInitialState(),
      { type: ActionType.ActivateMotion, motion: Motion.IncrementDegree },
    ).motion
  ).toBe(
    Motion.IncrementDegree
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.CompleteMotion,
        nextMusicalKey: new MusicalKey({ root: 2, degree: 3 }),
        nextAreDucksInARow: true,
      },
    ).root
  ).toBe(
    2
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.CompleteMotion,
        nextMusicalKey: new MusicalKey({ root: 2, degree: 3 }),
        nextAreDucksInARow: true,
      },
    ).degree
  ).toBe(
    3
  )
  expect(
    reducer(
      getInitialState(),
      {
        type: ActionType.CompleteMotion,
        nextMusicalKey: new MusicalKey({ root: 2, degree: 3 }),
        nextAreDucksInARow: true,
      },
    ).areDucksInARow
  ).toBe(
    true
  )
})
