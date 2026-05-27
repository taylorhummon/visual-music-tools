import { DotAnimator } from "@scalesTool/classes/DotAnimator"
import { Dot } from "@scalesTool/components/clock/Dot"
import { Description } from "@scalesTool/components/clock/Description"
import { Face } from "@scalesTool/components/clock/Face"
import { DegreeSpotlight } from "@scalesTool/components/clock/DegreeSpotlight"
import { OrdinaryLabel } from "@scalesTool/components/clock/OrdinaryLabel"
import { RootSpotlight } from "@scalesTool/components/clock/RootSpotlight"
import { SolfegeLabel } from "@scalesTool/components/clock/SolfegeLabel"
import { SwapButton } from "@scalesTool/components/clock/SwapButton"
import { type ButtonClickHandler } from "@scalesTool/utilities/button"
import { type Derived } from "@scalesTool/utilities/derived"
import { NATURAL_NOTES } from "@scalesTool/utilities/naturalNote"
import { SOLFEGE_LETTERS } from "@scalesTool/utilities/solfege"

import clockCssModule from "./Clock.module.scss"


interface ClockParameters {
  derived: Derived,
  buttonClickHandler: ButtonClickHandler,
}

export function Clock({
  derived,
  buttonClickHandler,
}: ClockParameters): React.ReactNode {
  const dotAnimator = new DotAnimator({ derived })

  return (
    <g className={clockCssModule["clock"]}>
      <SwapButton
        derived={derived}
        clickHandler={buttonClickHandler}
      />
      <RootSpotlight
        derived={derived}
      />
      <DegreeSpotlight
        derived={derived}
      />
      <Face />
      {SOLFEGE_LETTERS.map((solfegeLetter) =>
        <Dot
          key={solfegeLetter}
          derived={derived}
          dotAnimator={dotAnimator}
          solfegeLetter={solfegeLetter}
        />
      )}
      {NATURAL_NOTES.map((naturalNote) =>
        <OrdinaryLabel
          key={naturalNote}
          derived={derived}
          naturalNote={naturalNote}
        />
      )}
      {SOLFEGE_LETTERS.map((solfegeLetter) =>
        <SolfegeLabel
          key={solfegeLetter}
          derived={derived}
          solfegeLetter={solfegeLetter}
        />
      )}
      <Description
        derived={derived}
      />
    </g>
  )
}
