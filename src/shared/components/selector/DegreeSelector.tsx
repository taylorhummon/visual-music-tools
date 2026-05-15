import { type MusicalKey } from "@shared/classes/MusicalKey"
import { SHARP, FLAT } from "@shared/classes/Note"
import { SelectorValue } from "@shared/components/selector/SelectorValue"
import { buildClassName } from "@shared/utilities/css"
import { isBetweenInclusive } from "@shared/utilities/math"
import { type Motion, getWillIncrementDegree, getWillDecrementDegree } from "@shared/utilities/motion"
import { EXTENDED_POSITIONS } from "@shared/utilities/selector"

import selectorCssModule from "./Selector.module.scss"


interface DegreeSelectorInput {
  maxDegree: number,
  minDegree: number,
  motion: Motion,
  musicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function DegreeSelector({
  maxDegree,
  minDegree,
  motion,
  musicalKey,
  nextMusicalKey,
}: DegreeSelectorInput): React.ReactNode {
  const pairs = EXTENDED_POSITIONS.map(
    (position) => ({ position, degree: musicalKey.degree + position })
  ).filter(
    ({ degree }) => isBetweenInclusive(degree, minDegree, maxDegree)
  )
  const degreeDifference = nextMusicalKey.degree - musicalKey.degree

  return (
    <g className={selectorCssModule["degree-selector"]}>
      <text className={selectorCssModule["label"]}>
        Deg
      </text>
      <g clipPath="url(#selectors-clip-path)">
        <g className={getClassName(motion)}>
          {pairs.map(({ position, degree }) => (
            <SelectorValue
              key={position}
              currentPosition={position}
              nextPosition={position - degreeDifference}
            >
              {getFancyDegree(degree)}
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
  if (getWillIncrementDegree(motion)) {
    classNames.push("move-up")
  } else if (getWillDecrementDegree(motion)) {
    classNames.push("move-down")
  }
  return buildClassName(selectorCssModule, classNames)
}

function getFancyDegree(
  degree: number,
): React.ReactNode {
  const count = Math.abs(degree)
  if (degree > 0) {
    return <>{count}{SHARP}</>
  }
  if (degree < 0) {
    return <>{count}{FLAT}</>
  }
  return <>0</>
}
