import { useMemo } from "react"

import { MusicalKey } from "@scalesTool/classes/MusicalKey"
import { type ClockSettings } from "@scalesTool/utilities/clock"
import { Motion, getNextMusicalKey, getNextAreDucksInARow } from "@scalesTool/utilities/motion"
import { type State } from "@scalesTool/utilities/state"


export interface Derived {
  clockSettings: ClockSettings,
  motion: Motion,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
  currentAreDucksInARow: boolean,
  nextAreDucksInARow: boolean,
}

export function useDerived(
  state: State,
): Derived {
  const {
    isUsingDegreeSpotlight,
    isUsingSolfege,
    isAnchoringRoot,
    isUsingAnimation,
    animationOption,
    motion,
    root,
    degree,
    areDucksInARow,
  } = state
  const clockSettings = useMemo(
    () => {
      return {
        isUsingDegreeSpotlight,
        isUsingSolfege,
        isAnchoringRoot,
        isUsingAnimation,
        animationOption,
      }
    },
    [
      isUsingDegreeSpotlight,
      isUsingSolfege,
      isAnchoringRoot,
      isUsingAnimation,
      animationOption,
    ]
  )
  const currentMusicalKey = useMemo(
    () => {
      return new MusicalKey({ root, degree })
    },
    [ root, degree ],
  )
  const nextMusicalKey = useMemo(
    () => {
      return getNextMusicalKey({ motion, currentMusicalKey })
    },
    [ motion, currentMusicalKey ],
  )
  const currentAreDucksInARow = areDucksInARow
  const nextAreDucksInARow = useMemo(
    () => {
      return getNextAreDucksInARow({ motion, currentAreDucksInARow })
    },
    [ motion, currentAreDucksInARow ]
  )
  return {
    clockSettings,
    motion,
    currentMusicalKey,
    nextMusicalKey,
    currentAreDucksInARow,
    nextAreDucksInARow,
  }
}
