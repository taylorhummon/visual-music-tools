import { type MusicalKey } from "@shared/classes/MusicalKey"
import { type DotAnimator } from "@shared/classes/DotAnimator"
import { type ClockSettings, getHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"
import { SolfegeLetter } from "@shared/utilities/solfege"

import dotCssModule from "./Dot.module.scss"


interface DotParameters {
  clockSettings: ClockSettings,
  currentMusicalKey: MusicalKey,
  dotAnimator: DotAnimator,
  solfegeLetter: SolfegeLetter,
}

export function Dot({
  clockSettings,
  currentMusicalKey,
  dotAnimator,
  solfegeLetter,
}: DotParameters): React.ReactNode {
  const startNote = currentMusicalKey.noteFromSolfegeLetter(solfegeLetter)
  const startHour = getHour({ clockSettings, musicalKey: currentMusicalKey, note: startNote })
  const finishHour = dotAnimator.getFinishHour(startHour, startNote.naturalNote, solfegeLetter)

  return (
    <circle
      className={getClassName(startHour, finishHour)}
      cx="0"
      cy="0"
      r="8"
      fill="black"
      data-testid={`dot-${solfegeLetter}`}
    />
  )
}

function getClassName(
  startHour: number,
  finishHour: number,
): string {
  const classNames = [ "dot" ]
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(dotCssModule, classNames)
}
