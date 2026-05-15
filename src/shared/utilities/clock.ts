import { Note } from "@shared/classes/Note"
import { remainderFor } from "@shared/utilities/math"


export interface ClockSettings {
  isUsingAnimation: boolean,
  isAlphabetical: boolean,
  isUsingSolfege: boolean,
}

interface getHourInput {
  isAlphabetical: boolean,
  note: Note,
}

export function getHour({
  isAlphabetical,
  note,
}: getHourInput): number {
  if (isAlphabetical) {
    return remainderFor(7 * note.value, 12)
  } else {
    return remainderFor(note.value, 12)
  }
}
