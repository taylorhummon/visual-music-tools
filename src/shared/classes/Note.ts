import {
  quotientAndRemainderFor,
  ensureZeroIsPositive,
} from "@shared/utilities/math"
import {
  NaturalNote,
  NATURAL_NOTES_IN_FCGDAEB_ORDER,
  NATURAL_NOTES_IN_BEADGCF_ORDER,
} from "@shared/utilities/naturalNote"


export const SHARP = "♯"
export const FLAT = "♭"


interface buildNoteInput {
  naturalNote: NaturalNote,
  sharpsCount: number,
}

export function buildNote({
  naturalNote,
  sharpsCount,
}: buildNoteInput): Note {

  return new Note({ value: getValue(naturalNote, sharpsCount) })
}

interface constructorInput {
  value: number,
}

export class Note {
  value: number                  // big steps from D
  naturalNote: NaturalNote
  sharpsCount: number            // positive means sharps; 0 means natural; negative means flats.

  constructor({
    value,
  }: constructorInput) {
    this.value = value
    const { naturalNote, sharpsCount } = getNaturalNoteAndSharpsCount(this.value)
    this.naturalNote = naturalNote
    this.sharpsCount = sharpsCount
  }

  get name(
  ): string {
    if (this.sharpsCount > 0) {
      return this.naturalNote + SHARP.repeat(this.sharpsCount)
    } else if (this.sharpsCount < 0) {
      return this.naturalNote + FLAT.repeat(- this.sharpsCount)
    } else {
      return this.naturalNote
    }
  }
}

// *** Private functions below this line ***

function getValue(
  naturalNote: NaturalNote,
  sharpsCount: number,
): number {
  const index = NATURAL_NOTES_IN_FCGDAEB_ORDER.indexOf(naturalNote)
  return 7 * sharpsCount + index - 3
}

function getNaturalNoteAndSharpsCount(
  value: number,
): { naturalNote: NaturalNote, sharpsCount: number } {
  if (value > 0) {
    const { quotient, remainder } = quotientAndRemainderFor(3 + value, 7)
    return {
      naturalNote: NATURAL_NOTES_IN_FCGDAEB_ORDER[remainder],
      sharpsCount: quotient
    }
  }
  if (value < 0) {
    const { quotient, remainder } = quotientAndRemainderFor(3 - value, 7)
    return {
      naturalNote: NATURAL_NOTES_IN_BEADGCF_ORDER[remainder],
      sharpsCount: ensureZeroIsPositive(- quotient)
    }
  }
  return { naturalNote: NaturalNote.D, sharpsCount: 0 }
}
