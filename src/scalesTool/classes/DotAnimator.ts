import { AnimationOption, getCurrentHour, getNextHour } from "@scalesTool/utilities/clock"
import { getRemainder } from "@scalesTool/utilities/math"
import { type Derived } from "@scalesTool/utilities/derived"
import { Motion } from "@scalesTool/utilities/motion"
import { type NaturalNote } from "@scalesTool/utilities/naturalNote"
import { type SolfegeLetter } from "@scalesTool/utilities/solfege"


interface constructorParameters {
  derived: Derived
}

export class DotAnimator {
  #derived: Derived
  #_leftOverNotes: LeftOverNotes | null | undefined

  constructor({
    derived,
  }: constructorParameters) {
    this.#derived = derived
  }

  getFinishHour(
    startHour: number,
    naturalNote: NaturalNote,
    solfegeLetter: SolfegeLetter,
  ): number {
    const { clockSettings, motion } = this.#derived
    if (motion === Motion.Still) {
      return startHour
    }
    if (motion === Motion.ArrangeDucks || motion === Motion.ExplodeDucks) {
      if (getRemainder(startHour, 2) === 1) {
        return getRemainder(startHour + 6, 12)
      }
      return startHour
    }
    const { animationOption } = clockSettings
    if (animationOption === AnimationOption.Combo) {
      return this.#combo(startHour)
    }
    if (animationOption === AnimationOption.Ballet) {
      return this.#notesBallet(startHour)
    }
    if (animationOption === AnimationOption.Minimal) {
      return this.#minimal(startHour)
    }
    if (animationOption === AnimationOption.FollowsOrdinaryLabel) {
      return this.#followsOrdinaryLabel(naturalNote)
    }
    if (animationOption === AnimationOption.FollowsSolfegeLabel) {
      return this.#followsSolfegeLabel(solfegeLetter)
    }
    throw Error(`Unknown animation option ${animationOption}`)
  }

  #combo(
    startHour: number,
  ): number {
    const { currentAreDucksInARow } = this.#derived
    if (currentAreDucksInARow) {
      return this.#notesBallet(startHour)
    } else {
      return this.#minimal(startHour)
    }
  }

  #notesBallet(
    startHour: number,
  ): number {
    if (this.#leftOverNotes === null) return startHour
    const { currentLeftOverNoteHour, nextLeftOverNoteHour } = this.#leftOverNotes
    return getRemainder(startHour + nextLeftOverNoteHour - currentLeftOverNoteHour + 6, 12)
  }

  #minimal(
    startHour: number,
  ): number {
    if (this.#leftOverNotes === null) return startHour
    const { currentLeftOverNoteHour, nextLeftOverNoteHour } = this.#leftOverNotes
    return startHour === currentLeftOverNoteHour ? nextLeftOverNoteHour : startHour
  }

  #followsOrdinaryLabel(
    naturalNote: NaturalNote,
  ): number {
    const { nextMusicalKey } = this.#derived
    const note = nextMusicalKey.noteFromNaturalNote(naturalNote)
    return getNextHour(this.#derived, note)
  }

  #followsSolfegeLabel(
    solfegeLetter: SolfegeLetter,
  ): number {
    const { nextMusicalKey } = this.#derived
    const note = nextMusicalKey.noteFromSolfegeLetter(solfegeLetter)
    return getNextHour(this.#derived, note)
  }

  get #leftOverNotes(
  ): LeftOverNotes | null {
    if (this.#_leftOverNotes === undefined) {
      this.#_leftOverNotes = getLeftOverNotes(this.#derived)
    }
    return this.#_leftOverNotes
  }
}

// *** Private functions below this line ***

interface LeftOverNotes {
  currentLeftOverNoteHour: number,
  nextLeftOverNoteHour: number,
}

function getLeftOverNotes(
  derived: Derived,
): LeftOverNotes | null {
  const { currentMusicalKey, nextMusicalKey } = derived
  const currentHours = new Set(currentMusicalKey.notes.map(
    (note) => getCurrentHour(derived, note))
  )
  const nextHours = new Set(nextMusicalKey.notes.map(
    (note) => getNextHour(derived, note)
  ))
  const sharedHours = currentHours.intersection(nextHours)
  if (sharedHours.size === 7) {
    return null
  }
  if (sharedHours.size === 6) {
    const [ currentLeftOverNoteHour ] = [ ...currentHours.difference(sharedHours) ]
    const [ nextLeftOverNoteHour ] = [ ...nextHours.difference(sharedHours) ]
    return { currentLeftOverNoteHour, nextLeftOverNoteHour }
  }
  throw Error("Unrecognized transition between musical keys")
}
