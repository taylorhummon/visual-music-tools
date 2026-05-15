import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Note } from "@shared/classes/Note"
import { Motion, getWillIncrementDegree, getWillDecrementDegree } from "@shared/utilities/motion"


interface constructorInput {
  isAlphabetical: boolean,
  motion: Motion,
  musicalKey: MusicalKey,
}

export class NoteDotAnimator {
  #isAlphabetical: boolean
  #motion: Motion
  #headNoteValue: number
  #tailNoteValue: number

  constructor({
    isAlphabetical,
    motion,
    musicalKey,
  }: constructorInput) {
    this.#isAlphabetical = isAlphabetical
    this.#motion = motion
    this.#headNoteValue = musicalKey.headNote.value
    this.#tailNoteValue = musicalKey.tailNote.value
  }

  finishNote(
    startNote: Note,
  ): Note {
    if (this.#isAlphabetical) {
      return this.#whenAlphabetical(startNote)
    } else {
      return this.#whenNotAlphabetical(startNote)
    }
  }

  #whenAlphabetical(
    startNote: Note,
  ): Note {
    if (
      getWillIncrementDegree(this.#motion) &&
      startNote.value === this.#tailNoteValue
    ) {
      return new Note({ value: startNote.value + 7 })
    }
    if (
      getWillDecrementDegree(this.#motion) &&
      startNote.value === this.#headNoteValue
    ) {
      return new Note({ value: startNote.value - 7 })
    }
    return startNote
  }

  #whenNotAlphabetical(
    startNote: Note,
  ): Note {
    if (getWillIncrementDegree(this.#motion)) {
      return new Note({ value: startNote.value + 1 })
    }
    if (getWillDecrementDegree(this.#motion)) {
      return new Note({ value: startNote.value - 1 })
    }
    return startNote
  }
}
