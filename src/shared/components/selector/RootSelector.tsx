import { type MusicalKey } from "@shared/classes/MusicalKey"
import { SelectorValue } from "@shared/components/selector/SelectorValue"
import { buildClassName } from "@shared/utilities/css"
import { isBetweenInclusive } from "@shared/utilities/math"
import { type Motion } from "@shared/utilities/motion"
import { getWillIncrementRoot, getWillDecrementRoot } from "@shared/utilities/motion"
import { EXTENDED_POSITIONS, noteAt } from "@shared/utilities/selector"

import selectorCssModule from "./Selector.module.scss"


interface RootSelectorInput {
  maxDegree: number,
  minDegree: number,
  motion: Motion,
  musicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function RootSelector({
  maxDegree,
  minDegree,
  motion,
  musicalKey,
  nextMusicalKey,
}: RootSelectorInput): React.ReactNode {
  const pairs = EXTENDED_POSITIONS.map(
    (position) => ({ position, note: noteAt(musicalKey, position) })
  ).filter(
    ({ note }) => isBetweenInclusive(note.value, minDegree - 3, maxDegree + 3)
  )
  const rootDifference = nextMusicalKey.root - musicalKey.root

  return (
    <g className={selectorCssModule["root-selector"]}>
      <text className={selectorCssModule["label"]}>
        Root
      </text>
      <g clipPath="url(#selectors-clip-path)">
        <g className={getClassName(motion)}>
          {pairs.map(({ position, note }) => (
            <SelectorValue
              key={position}
              currentPosition={position}
              nextPosition={position - rootDifference}
            >
              {note.name}
            </SelectorValue>
          ))}
        </g>
      </g>
    </g>
  )
}

function getClassName(
  motion: Motion,
): string {
  const classNames = [ "selector-inner" ]
  if (getWillIncrementRoot(motion)) {
    classNames.push("move-up")
  } else if (getWillDecrementRoot(motion)) {
    classNames.push("move-down")
  }
  return buildClassName(selectorCssModule, classNames)
}
