import { type MusicalKey } from "@shared/classes/MusicalKey"
import { SYMMETRY_SPOTLIGHT_STROKE, SYMMETRY_SPOTLIGHT_FILL } from "@shared/utilities/color"
import { type ClockSettings, getHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"

import symmetryDotCssModule from "./SymmetrySpotlight.module.scss"


interface SymmetrySpotlightParameters {
  clockSettings: ClockSettings,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function SymmetrySpotlight({
  clockSettings,
  currentMusicalKey,
  nextMusicalKey,
}: SymmetrySpotlightParameters): React.ReactNode {
  if (! clockSettings.isUsingSymmetrySpotlight) return null

  return (
    <circle
      className={getClassName(clockSettings, currentMusicalKey, nextMusicalKey)}
      data-testid={"clock-symmetry-spotlight"}
      cx="0"
      cy="0"
      r="14"
      strokeWidth="1.6"
      stroke={SYMMETRY_SPOTLIGHT_STROKE}
      fill={SYMMETRY_SPOTLIGHT_FILL}
    />
  )
}

function getClassName(
  clockSettings: ClockSettings,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
): string {
  const classNames = [ "symmetry-spotlight" ]
  const startHour = getHour({ clockSettings, musicalKey: currentMusicalKey, note: currentMusicalKey.degreeNote })
  const finishHour = getHour({ clockSettings, musicalKey: nextMusicalKey, note: nextMusicalKey.degreeNote })
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(symmetryDotCssModule, classNames)
}
