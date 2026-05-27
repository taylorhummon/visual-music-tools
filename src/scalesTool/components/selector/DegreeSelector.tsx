import { SHARP, FLAT } from "@scalesTool/classes/Note"
import { Selector } from "@scalesTool/components/selector/Selector"
import { SelectorValue } from "@scalesTool/components/selector/SelectorValue"
import { isBetweenInclusive } from "@scalesTool/utilities/math"
import { type Derived } from "@scalesTool/utilities/derived"
import { getWillIncrementDegree, getWillDecrementDegree } from "@scalesTool/utilities/motion"
import { EXTENDED_POSITIONS } from "@scalesTool/utilities/selector"

import degreeSelectorCssModule from "./DegreeSelector.module.scss"


interface DegreeSelectorParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
}

export function DegreeSelector({
  derived,
  maxDegree,
  minDegree,
}: DegreeSelectorParameters): React.ReactNode {
  const { motion, currentMusicalKey, nextMusicalKey } = derived
  const pairs = EXTENDED_POSITIONS.map(
    (position) => ({ position, degree: currentMusicalKey.degree + position })
  ).filter(
    ({ degree }) => isBetweenInclusive(degree, minDegree, maxDegree)
  )
  const degreeDifference = nextMusicalKey.degree - currentMusicalKey.degree

  return (
    <Selector
      className={degreeSelectorCssModule["degree-selector"]}
      label="Deg"
      isIncrementing={getWillIncrementDegree(motion)}
      isDecrementing={getWillDecrementDegree(motion)}
    >
      {pairs.map(({ position, degree }) => (
        <SelectorValue
          key={position}
          currentPosition={position}
          nextPosition={position - degreeDifference}
        >
          {getFancyDegree(degree)}
        </SelectorValue>
      ))}
    </Selector>
  )
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
