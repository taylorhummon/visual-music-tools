import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Note } from "@shared/classes/Note"
import { type Motion } from "@shared/utilities/motion"
import { getWillIncrementDegree, getWillDecrementDegree } from "@shared/utilities/motion"


interface constructorInput {
  motion: Motion,
  musicalKey: MusicalKey,
}

export class NoteLabelAnimator {
  #motion: Motion
  #movingNote?: Note

  constructor({
    motion,
    musicalKey,
  }: constructorInput) {
    this.#motion = motion
    this.#movingNote = getMovingNote(motion, musicalKey)
  }

  finishNote(
    startNote: Note,
  ): Note {
    if (startNote.value === this.#movingNote?.value) {
      if (getWillIncrementDegree(this.#motion)) {
        return new Note({ value: startNote.value + 7 })
      }
      if (getWillDecrementDegree(this.#motion)) {
        return new Note({ value: startNote.value - 7 })
      }
    }
    return startNote
  }
}

// *** Private functions below this line ***

function getMovingNote(
  motion: Motion,
  musicalKey: MusicalKey,
): Note | undefined {
  if (getWillIncrementDegree(motion)) {
    return musicalKey.tailNote
  }
  if (getWillDecrementDegree(motion)) {
    return musicalKey.headNote
  }
  return undefined;
}
