import { Selector } from "@scalesTool/components/selector/Selector"
import { SelectorValue } from "@scalesTool/components/selector/SelectorValue"
import { isBetweenInclusive } from "@scalesTool/utilities/math"
import { getWillIncrementRoot, getWillDecrementRoot } from "@scalesTool/utilities/motion"
import { type Derived } from "@scalesTool/utilities/derived"
import { EXTENDED_POSITIONS, noteAt } from "@scalesTool/utilities/selector"

import rootSelectorCssModule from "./RootSelector.module.scss"


interface RootSelectorParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
}

export function RootSelector({
  derived,
  maxDegree,
  minDegree,
}: RootSelectorParameters): React.ReactNode {
  const { motion, currentMusicalKey, nextMusicalKey } = derived
  const pairs = EXTENDED_POSITIONS.map(
    (position) => ({ position, note: noteAt(currentMusicalKey, position) })
  ).filter(
    ({ note }) => isBetweenInclusive(note.value, minDegree - 3, maxDegree + 3)
  )
  const rootDifference = nextMusicalKey.root - currentMusicalKey.root

  return (
    <Selector
      className={rootSelectorCssModule["root-selector"]}
      label="Root"
      isIncrementing={getWillIncrementRoot(motion)}
      isDecrementing={getWillDecrementRoot(motion)}
    >
      {pairs.map(({ position, note }) => (
        <SelectorValue
          key={position}
          currentPosition={position}
          nextPosition={position - rootDifference}
        >
          {note.name}
        </SelectorValue>
      ))}
    </Selector>
  )
}
