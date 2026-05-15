import { type MusicalKey } from "@shared/classes/MusicalKey"
import { type Note } from "@shared/classes/Note"
import { NoteLabelAnimator } from "@shared/classes/NoteLabelAnimator"
import { SolfegeLabelAnimator } from "@shared/classes/SolfegeLabelAnimator"
import { NoteLabel } from "@shared/components/clock/NoteLabel"
import { SolfegeLabel } from "@shared/components/clock/SolfegeLabel"
import { type ClockSettings } from "@shared/utilities/clock"
import { arrayFromMap } from "@shared/utilities/map"
import { type Motion } from "@shared/utilities/motion"
import { SolfegeLetter } from "@shared/utilities/solfege"


interface LabelsInput {
  clockSettings: ClockSettings,
  motion: Motion,
  musicalKey: MusicalKey,
}

export function Labels({
  clockSettings,
  motion,
  musicalKey,
}: LabelsInput): React.ReactNode {
  const { isUsingSolfege } = clockSettings
  if (isUsingSolfege) {
    return (
      <SolfegeLabels
        clockSettings={clockSettings}
        motion={motion}
        musicalKey={musicalKey}
      />
    )
  } else {
    return (
      <NoteLabels
        clockSettings={clockSettings}
        motion={motion}
        musicalKey={musicalKey}
      />
    )
  }
}

function SolfegeLabels({
  clockSettings,
  motion,
  musicalKey,
}: LabelsInput) {
  const solfegeLabelAnimator = new SolfegeLabelAnimator({ motion, musicalKey })

  return (
    <>
      {arrayFromMap(musicalKey.scale, (note: Note, solfegeLetter: SolfegeLetter) => (
        <SolfegeLabel
          key={note.value}
          clockSettings={clockSettings}
          solfegeLabelAnimator={solfegeLabelAnimator}
          solfegeLetter={solfegeLetter}
          note={note}
        />
      ))}
    </>
  )
}

function NoteLabels({
  clockSettings,
  motion,
  musicalKey,
}: LabelsInput) {
  const noteLabelAnimator = new NoteLabelAnimator({ motion, musicalKey })

  return (
    <>
      {arrayFromMap(musicalKey.scale, (note: Note) => (
        <NoteLabel
          key={note.value}
          clockSettings={clockSettings}
          noteLabelAnimator={noteLabelAnimator}
          note={note}
        />
      ))}
    </>
  )
}
