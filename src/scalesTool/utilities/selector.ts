import { type MusicalKey } from "@scalesTool/classes/MusicalKey"
import { Note } from "@scalesTool/classes/Note"


export const EXTENDED_POSITIONS = [ -4, -3, -2, -1, 0, 1, 2, 3, 4 ]

export function noteAt(
  musicalKey: MusicalKey,
  position: number,
): Note {
  return new Note({ value: musicalKey.root + position })
}
