import { type MusicalKey } from "@shared/classes/MusicalKey"
import { type Note } from "@shared/classes/Note"
import { NoteDotAnimator } from "@shared/classes/NoteDotAnimator"
import { Face } from "@shared/components/clock/Face"
import { KeyDescription } from "@shared/components/clock/KeyDescription"
import { Labels } from "@shared/components/clock/Labels"
import { NoteDot } from "@shared/components/clock/NoteDot"
import { RootDot } from "@shared/components/clock/RootDot"
import { type ClockSettings } from "@shared/utilities/clock"
import { arrayFromMap } from "@shared/utilities/map"
import { type Motion } from "@shared/utilities/motion"

import clockCssModule from "./Clock.module.scss"


interface ClockInput {
  clockSettings: ClockSettings,
  motion: Motion,
  musicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function Clock({
  clockSettings,
  motion,
  musicalKey,
  nextMusicalKey,
}: ClockInput): React.ReactNode {
  const { isAlphabetical } = clockSettings
  const noteDotAnimator = new NoteDotAnimator({ isAlphabetical, motion, musicalKey })

  return (
    <g className={clockCssModule["clock"]}>
      <RootDot
        clockSettings={clockSettings}
        musicalKey={musicalKey}
        nextMusicalKey={nextMusicalKey}
      />
      <Face />
      {arrayFromMap(musicalKey.scale, (note: Note) => (
        <NoteDot
          key={note.value}
          clockSettings={clockSettings}
          noteDotAnimator={noteDotAnimator}
          note={note}
        />
      ))}
      <Labels
        clockSettings={clockSettings}
        motion={motion}
        musicalKey={musicalKey}
      />
      <KeyDescription
        musicalKey={musicalKey}
      />
    </g>
  )
}
