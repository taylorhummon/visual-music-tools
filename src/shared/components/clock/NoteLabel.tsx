import { type Note } from "@shared/classes/Note"
import { type NoteLabelAnimator } from "@shared/classes/NoteLabelAnimator"
import { NoteLabelText } from "@shared/components/clock/NoteLabelText"
import { type ClockSettings, getHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"

import noteLabelCssModule from "./NoteLabel.module.scss"


interface NoteLabelInput {
  clockSettings: ClockSettings,
  noteLabelAnimator: NoteLabelAnimator,
  note: Note,
}

export function NoteLabel({
  clockSettings,
  noteLabelAnimator,
  note,
}: NoteLabelInput): React.ReactNode {
  const { isAlphabetical } = clockSettings
  const finishNote = noteLabelAnimator.finishNote(note)

  return (
    <g className={getClassName(isAlphabetical, note, finishNote)}>
      <NoteLabelText
        startNote={note}
        finishNote={finishNote}
      />
    </g>
  )
}

function getClassName(
  isAlphabetical: boolean,
  startNote: Note,
  finishNote: Note,
): string {
  const classNames = [ "note-label" ]
  if (finishNote.value === startNote.value) {
    const hour = getHour({ isAlphabetical, note: startNote })
    const characterCount = startNote.name.length
    classNames.push(`hour-${hour}-cc-${characterCount}`)
  } else {
    const startHour = getHour({ isAlphabetical, note: startNote })
    const startCharacterCount = startNote.name.length
    const finishHour = getHour({ isAlphabetical, note: finishNote })
    const finishCharacterCount = finishNote.name.length
    classNames.push(`move-from-${startHour}-cc-${startCharacterCount}-to-${finishHour}-cc-${finishCharacterCount}`)
  }
  return buildClassName(noteLabelCssModule, classNames, [ "fixed-width-font" ])
}
