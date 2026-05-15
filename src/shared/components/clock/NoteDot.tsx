import { type Note } from "@shared/classes/Note"
import { type NoteDotAnimator } from "@shared/classes/NoteDotAnimator"
import { type ClockSettings, getHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"

import noteDotCssModule from "./NoteDot.module.scss"


interface NoteDotInput {
  clockSettings: ClockSettings,
  noteDotAnimator: NoteDotAnimator,
  note: Note,
}

export function NoteDot({
  clockSettings,
  noteDotAnimator,
  note,
}: NoteDotInput): React.ReactNode {
  const { isAlphabetical } = clockSettings

  return (
    <circle
      className={getClassName(isAlphabetical, noteDotAnimator, note)}
      cx="0"
      cy="0"
      r="8"
      fill="black"
    />
  )
}

function getClassName(
  isAlphabetical: boolean,
  noteDotAnimator: NoteDotAnimator,
  note: Note,
): string {
  const classNames = [ "note-dot" ]
  const startHour = getHour({ isAlphabetical, note })
  const finishHour = getHour({ isAlphabetical, note: noteDotAnimator.finishNote(note) })
  if (finishHour === startHour) {
    classNames.push(`hour-${startHour}`)
  } else {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  }
  return buildClassName(noteDotCssModule, classNames)
}
