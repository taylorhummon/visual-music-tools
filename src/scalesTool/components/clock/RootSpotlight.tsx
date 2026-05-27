import { ROOT_SPOTLIGHT_STROKE, ROOT_SPOTLIGHT_FILL } from "@scalesTool/utilities/color"
import { getCurrentHour, getNextHour } from "@scalesTool/utilities/clock"
import { type Derived } from "@scalesTool/utilities/derived"
import { buildClassName } from "@scalesTool/utilities/css"

import rootSpotlightCssModule from "./RootSpotlight.module.scss"


interface RootSpotlightParameters {
  derived: Derived,
}

export function RootSpotlight({
  derived,
}: RootSpotlightParameters): React.ReactNode {
  return (
    <circle
      className={getClassName(derived)}
      data-testid={"clock-root-spotlight"}
      cx="0"
      cy="0"
      r="14"
      strokeWidth="1.6"
      stroke={ROOT_SPOTLIGHT_STROKE}
      fill={ROOT_SPOTLIGHT_FILL}
    />
  )
}

function getClassName(
  derived: Derived,
): string {
  const { currentMusicalKey, nextMusicalKey } = derived
  const classNames = [ "root-spotlight" ]
  const startHour = getCurrentHour(derived, currentMusicalKey.rootNote)
  const finishHour = getNextHour(derived, nextMusicalKey.rootNote)
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(rootSpotlightCssModule, classNames)
}
