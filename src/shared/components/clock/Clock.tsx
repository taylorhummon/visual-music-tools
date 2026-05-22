import { type MusicalKey } from "@shared/classes/MusicalKey"
import { DotAnimator } from "@shared/classes/DotAnimator"
import { Dot } from "@shared/components/clock/Dot"
import { Description } from "@shared/components/clock/Description"
import { Face } from "@shared/components/clock/Face"
import { OrdinaryLabel } from "@shared/components/clock/OrdinaryLabel"
import { RootSpotlight } from "@shared/components/clock/RootSpotlight"
import { SolfegeLabel } from "@shared/components/clock/SolfegeLabel"
import { SymmetrySpotlight } from "@shared/components/clock/SymmetrySpotlight"
import { type ClockSettings } from "@shared/utilities/clock"
import { type Motion } from "@shared/utilities/motion"
import { NATURAL_NOTES } from "@shared/utilities/naturalNote"
import { SOLFEGE_LETTERS } from "@shared/utilities/solfege"

import clockCssModule from "./Clock.module.scss"


interface ClockParameters {
  clockSettings: ClockSettings,
  motion: Motion,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function Clock({
  clockSettings,
  motion,
  currentMusicalKey,
  nextMusicalKey,
}: ClockParameters): React.ReactNode {
  const dotAnimator = new DotAnimator({
    clockSettings,
    motion,
    currentMusicalKey,
    nextMusicalKey,
  })

  return (
    <g className={clockCssModule["clock"]}>
      <RootSpotlight
        clockSettings={clockSettings}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
      <SymmetrySpotlight
        clockSettings={clockSettings}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
      <Face />
      {SOLFEGE_LETTERS.map((solfegeLetter) =>
        <Dot
          key={solfegeLetter}
          clockSettings={clockSettings}
          currentMusicalKey={currentMusicalKey}
          dotAnimator={dotAnimator}
          solfegeLetter={solfegeLetter}
        />
      )}
      {NATURAL_NOTES.map((naturalNote) =>
        <OrdinaryLabel
          key={naturalNote}
          clockSettings={clockSettings}
          currentMusicalKey={currentMusicalKey}
          nextMusicalKey={nextMusicalKey}
          naturalNote={naturalNote}
        />
      )}
      {SOLFEGE_LETTERS.map((solfegeLetter) =>
        <SolfegeLabel
          key={solfegeLetter}
          clockSettings={clockSettings}
          currentMusicalKey={currentMusicalKey}
          nextMusicalKey={nextMusicalKey}
          solfegeLetter={solfegeLetter}
        />
      )}
      <Description
        currentMusicalKey={currentMusicalKey}
      />
    </g>
  )
}
