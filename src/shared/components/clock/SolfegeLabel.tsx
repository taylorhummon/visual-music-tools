import { type Note } from "@shared/classes/Note"
import { SolfegeLabelAnimator } from "@shared/classes/SolfegeLabelAnimator"
import { type ClockSettings, getHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"
import { SolfegeLetter } from "@shared/utilities/solfege"

import solfegeLabelCssModule from "./SolfegeLabel.module.scss"


interface SolfegeLabelInput {
  clockSettings: ClockSettings,
  solfegeLabelAnimator: SolfegeLabelAnimator,
  solfegeLetter: SolfegeLetter,
  note: Note,
}

export function SolfegeLabel({
  clockSettings,
  solfegeLabelAnimator,
  solfegeLetter,
  note,
}: SolfegeLabelInput): React.ReactNode {
  const { isAlphabetical } = clockSettings

  return (
    <g className={getClassName(isAlphabetical, solfegeLabelAnimator, note)}>
      <g className={getInnerClassName(solfegeLetter)}>
        <text className={solfegeLabelCssModule["text"]}>
          {solfegeLetter}
        </text>
      </g>
    </g>
  )
}

function getClassName(
  isAlphabetical: boolean,
  solfegeLabelAnimator: SolfegeLabelAnimator,
  note: Note,
): string {
  const classNames = [ "solfege-label" ]
  const startHour = getHour({ isAlphabetical, note })
  const finishHour = getHour({ isAlphabetical, note: solfegeLabelAnimator.finishNote(note) })
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(solfegeLabelCssModule, classNames, [ "fixed-width-font" ])
}

function getInnerClassName(
  solfegeLetter: SolfegeLetter
): string {
  const classNames = [ "solfege-label-inner" ]
  if (solfegeLetter === SolfegeLetter.Sol) {
    classNames.push("wide")
  } else {
    classNames.push("regular")
  }
  return buildClassName(solfegeLabelCssModule, classNames)
}
