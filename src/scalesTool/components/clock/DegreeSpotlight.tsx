import { DEGREE_SPOTLIGHT_STROKE, DEGREE_SPOTLIGHT_FILL } from "@scalesTool/utilities/color"
import { getCurrentHour, getNextHour } from "@scalesTool/utilities/clock"
import { type Derived } from "@scalesTool/utilities/derived"
import { buildClassName } from "@scalesTool/utilities/css"

import degreeSpotlightCssModule from "./DegreeSpotlight.module.scss"


interface DegreeSpotlightParameters {
  derived: Derived,
}

export function DegreeSpotlight({
  derived,
}: DegreeSpotlightParameters): React.ReactNode {
  const { clockSettings: { isUsingDegreeSpotlight } } = derived
  if (! isUsingDegreeSpotlight) return null

  return (
    <circle
      className={getClassName(derived)}
      data-testid={"clock-degree-spotlight"}
      cx="0"
      cy="0"
      r="14"
      strokeWidth="1.6"
      stroke={DEGREE_SPOTLIGHT_STROKE}
      fill={DEGREE_SPOTLIGHT_FILL}
    />
  )
}

function getClassName(
  derived: Derived,
): string {
  const { currentMusicalKey, nextMusicalKey } = derived
  const classNames = [ "degree-spotlight" ]
  const startHour = getCurrentHour(derived, currentMusicalKey.degreeNote)
  const finishHour = getNextHour(derived, nextMusicalKey.degreeNote)
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(degreeSpotlightCssModule, classNames)
}
