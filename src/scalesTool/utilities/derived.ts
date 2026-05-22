import { useMemo } from "react"

import { type State } from "@scalesTool/utilities/state"

import { MusicalKey } from "@shared/classes/MusicalKey"
import { type ClockSettings } from "@shared/utilities/clock"
import { Motion, getNextMusicalKey } from "@shared/utilities/motion"


export interface Derived {
  clockSettings: ClockSettings,
  motion: Motion,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function useDerived(
  state: State,
): Derived {
  const {
    isUsingAnimation,
    isUntangled,
    isUsingSymmetrySpotlight,
    isUsingSolfege,
    animationOption,
    anchorOption,
    motion,
    root,
    degree,
  } = state
  const clockSettings = useMemo(
    () => {
      return {
        isUsingAnimation,
        isUntangled,
        isUsingSymmetrySpotlight,
        isUsingSolfege,
        animationOption,
        anchorOption,
      }
    },
    [
      isUsingAnimation,
      isUntangled,
      isUsingSymmetrySpotlight,
      isUsingSolfege,
      animationOption,
      anchorOption,
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
      return getNextMusicalKey({ currentMusicalKey, motion })
    },
    [ currentMusicalKey, motion ],
  )
  return {
    clockSettings,
    motion,
    currentMusicalKey,
    nextMusicalKey,
  }
}
