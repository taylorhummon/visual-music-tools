import { type Note, SHARP, FLAT } from "@shared/classes/Note"

import noteLabelTextCssModule from "./NoteLabelText.module.scss"


interface NoteLabelTextInput {
  startNote: Note,
  finishNote: Note,
}

export function NoteLabelText({
  startNote,
  finishNote,
}: NoteLabelTextInput): React.ReactNode {
  if (finishNote.value !== startNote.value) {
    // The startCharacterCount and finishCharacterCount differ by exactly one
    const startCharacterCount = startNote.name.length
    const finishCharacterCount = finishNote.name.length
    const longerNote = finishCharacterCount > startCharacterCount ? finishNote : startNote
    const className = finishCharacterCount > startCharacterCount ? "appear" : "disappear"
    if (longerNote.sharpsCount > 0) {
      const opaqueSharpsCount = Math.abs(longerNote.sharpsCount) - 1
      return (
        <text>
          {longerNote.naturalNote}
          {SHARP.repeat(opaqueSharpsCount)}
          <tspan className={noteLabelTextCssModule[className]}>
            {SHARP}
          </tspan>
        </text>
      )
    }
    if (longerNote.sharpsCount < 0) {
      const opaqueFlatsCount = Math.abs(longerNote.sharpsCount) - 1
      return (
        <text>
          {longerNote.naturalNote}
          {FLAT.repeat(opaqueFlatsCount)}
          <tspan className={noteLabelTextCssModule[className]}>
            {FLAT}
          </tspan>
        </text>
      )
    }
  }
  return (
    <text>
      {startNote.name}
    </text>
  )
}
