import { test, expect } from "vitest"

import { MusicalKey } from "@shared/classes/MusicalKey"
import { Note } from "@shared/classes/Note"
import { NoteLabelAnimator } from "@shared/classes/NoteLabelAnimator"
import { buildInclusiveRange } from "@shared/utilities/array"
import { Motion } from "@shared/utilities/motion"


function noMotion(
  musicalKey: MusicalKey,
): Array<number> {
  return buildInclusiveRange(musicalKey.tailNote.value, musicalKey.headNote.value)
}

function exerciseAnimator(
  musicalKey: MusicalKey,
  animator: NoteLabelAnimator,
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

test("NoteLabelAnimator works when incrementing root", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.IncrementRoot, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
})

test("NoteLabelAnimator works when decrementing root", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.DecrementRoot, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
})

test("NoteLabelAnimator works when incrementing degree", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.IncrementDegree, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ 5, -1, 0, 1, 2, 3, 4 ]
  )
})

test("NoteLabelAnimator works when decrementing degree", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.DecrementDegree, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, -3 ]
  )
})

test("NoteLabelAnimator works when incrementing both", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.IncrementBoth, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ 5, -1, 0, 1, 2, 3, 4 ]
  )
})

test("NoteLabelAnimator works when decrementing both", () => {
  const musicalKey = new MusicalKey({ root: 2, degree: 1 })
  expect(
    noMotion(musicalKey)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, 4 ]
  )
  const animator = new NoteLabelAnimator({ motion: Motion.DecrementBoth, musicalKey })
  expect(
    exerciseAnimator(musicalKey, animator)
  ).toStrictEqual(
    [ -2, -1, 0, 1, 2, 3, -3 ]
  )
})
