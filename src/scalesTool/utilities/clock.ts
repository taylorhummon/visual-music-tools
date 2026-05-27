import { type MusicalKey } from "@scalesTool/classes/MusicalKey"
import { Note } from "@scalesTool/classes/Note"
import { type Derived } from "@scalesTool/utilities/derived"
import { getRemainder } from "@scalesTool/utilities/math"


export enum AnimationOption {
  Combo = "Combo",
  Minimal = "Minimal",
  Ballet = "Ballet",
  FollowsOrdinaryLabel = "Follows ordinary label",
  FollowsSolfegeLabel = "Follows solfege label",
}

export interface ClockSettings {
  isUsingDegreeSpotlight: boolean,
  isUsingSolfege: boolean,
  isAnchoringRoot: boolean,
  isUsingAnimation: boolean,
  animationOption: AnimationOption,
}

export function getCurrentHour(
  derived: Derived,
  note: Note,
): number {
  const { clockSettings, currentMusicalKey, currentAreDucksInARow } = derived
  return getHour(
    clockSettings,
    currentMusicalKey,
    currentAreDucksInARow,
    note,
  )
}

export function getNextHour(
  derived: Derived,
  note: Note,
): number {
  const { clockSettings, nextMusicalKey, nextAreDucksInARow } = derived
  return getHour(
    clockSettings,
    nextMusicalKey,
    nextAreDucksInARow,
    note,
  )
}

function getHour(
  clockSettings: ClockSettings,
  musicalKey: MusicalKey,
  areDucksInARow: boolean,
  note: Note,
): number {
  const anchorValue = clockSettings.isAnchoringRoot ? musicalKey.rootNote.value : 0
  const ducksMultiplier = areDucksInARow ? 1 : 7
  return getRemainder(ducksMultiplier * (note.value - anchorValue), 12)
}
