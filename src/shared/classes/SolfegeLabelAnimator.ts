import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Note } from "@shared/classes/Note"
import { Motion } from "@shared/utilities/motion"


interface constructorInput {
  motion: Motion,
  musicalKey: MusicalKey,
}

export class SolfegeLabelAnimator {
  #motion: Motion
  #headNoteValue: number
  #tailNoteValue: number

  constructor({
    motion,
    musicalKey,
  }: constructorInput) {
    this.#motion = motion
    this.#headNoteValue = musicalKey.headNote.value
    this.#tailNoteValue = musicalKey.tailNote.value
  }

  finishNote(
    startNote: Note,
  ): Note {
    if (this.#motion === Motion.Still) {
      return startNote
    }
    if (this.#motion === Motion.IncrementRoot) {
      if (startNote.value === this.#headNoteValue) {
        return new Note({ value: startNote.value + 6 })
      } else {
        return new Note({ value: startNote.value + 1 })
      }
    }
    if (this.#motion === Motion.DecrementRoot) {
      if (startNote.value === this.#tailNoteValue) {
        return new Note({ value: startNote.value - 6 })
      } else {
        return new Note({ value: startNote.value - 1 })
      }
    }
    if (this.#motion === Motion.IncrementDegree) {
      if (startNote.value === this.#tailNoteValue) {
        return new Note({ value: startNote.value + 7 })
      }
    }
    if (this.#motion === Motion.DecrementDegree) {
      if (startNote.value === this.#headNoteValue) {
        return new Note({ value: startNote.value - 7 })
      }
    }
    if (this.#motion === Motion.IncrementBoth) {
      return new Note({ value: startNote.value + 1 })
    }
    if (this.#motion === Motion.DecrementBoth) {
      return new Note({ value: startNote.value - 1 })
    }
    return startNote
  }
}
