import { MAX_DEGREE, MIN_DEGREE } from "@scalesTool/config"

import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Clock } from "@shared/components/clock/Clock"
import { ModeGauge } from "@shared/components/gauge/ModeGauge"
import { Selectors } from "@shared/components/selector/Selectors"
import { type ClockSettings } from "@shared/utilities/clock"
import { type Motion } from "@shared/utilities/motion"
import { type SelectorButtonClickHandler } from "@shared/utilities/selector"

import canvasCssModule from "./Canvas.module.scss"


interface CanvasParameters {
  clockSettings: ClockSettings,
  motion: Motion,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
  selectorButtonClickHandler: SelectorButtonClickHandler,
}

export function Canvas({
  clockSettings,
  motion,
  currentMusicalKey,
  nextMusicalKey,
  selectorButtonClickHandler,
}: CanvasParameters): React.ReactNode {
  return (
    <svg
      className={canvasCssModule["canvas"]}
      viewBox="0 0 600 440"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Selectors
        maxDegree={MAX_DEGREE}
        minDegree={MIN_DEGREE}
        motion={motion}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
        selectorButtonClickHandler={selectorButtonClickHandler}
      />
      <ModeGauge
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
      <Clock
        clockSettings={clockSettings}
        motion={motion}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
    </svg>
  )
}
