import { test, expect } from "vitest"

import { MusicalKey } from "@shared/classes/MusicalKey"
import { Note } from "@shared/classes/Note"
import { SolfegeLabelAnimator } from "@shared/classes/SolfegeLabelAnimator"
import { buildInclusiveRange } from "@shared/utilities/array"
import { Motion } from "@shared/utilities/motion"


function noMotion(
  musicalKey: MusicalKey,
): Array<number> {
  return buildInclusiveRange(musicalKey.tailNote.value, musicalKey.headNote.value)
}

function exerciseAnimator(
  musicalKey: MusicalKey,
  animator: SolfegeLabelAnimator,
): Array<number> {
  const values = buildInclusiveRange(musicalKey.tailNote.value, musicalKey.headNote.value)
  return values.map(
    (value) => new Note({ value })
  ).map(
    (startNote) => animator.finishNote(startNote)
  ).map(
    (finishNote) => finishNote.value
  );
}

test("SolfegeLabelAnimator works when incrementing root", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.IncrementRoot, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -1, 0, 1, 2, 3, 4, 10 ]
  )
})

test("SolfegeLabelAnimator works when decrementing root", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.DecrementRoot, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -8, -2, -1, 0, 1, 2, 3 ]
  )
})

test("SolfegeLabelAnimator works when incrementing degree", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.IncrementDegree, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ 5, -1, 0, 1, 2, 3, 4 ]
  )
})

test("SolfegeLabelAnimator works when decrementing degree", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.DecrementDegree, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, -3 ]
  )
})

test("SolfegeLabelAnimator works when incrementing both", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.IncrementBoth, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -1, 0, 1, 2, 3, 4, 5 ]
  )
})

test("SolfegeLabelAnimator works when decrementing both", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new SolfegeLabelAnimator({ motion: Motion.DecrementBoth, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -3, -2, -1, 0, 1, 2, 3 ]
  )
})
