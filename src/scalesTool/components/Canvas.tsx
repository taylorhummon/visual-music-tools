import { MAX_DEGREE, MIN_DEGREE } from "@scalesTool/config"

import { Clock } from "@scalesTool/components/clock/Clock"
import { ModeGauge } from "@scalesTool/components/gauge/ModeGauge"
import { Selectors } from "@scalesTool/components/selector/Selectors"
import { type ButtonClickHandler } from "@scalesTool/utilities/button"
import { type Derived } from "@scalesTool/utilities/derived"

import canvasCssModule from "./Canvas.module.scss"


interface CanvasParameters {
  derived: Derived,
  buttonClickHandler: ButtonClickHandler,
}

export function Canvas({
  derived,
  buttonClickHandler,
}: CanvasParameters): React.ReactNode {
  return (
    <svg
      className={canvasCssModule["canvas"]}
      viewBox="0 0 600 460"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Selectors
        derived={derived}
        maxDegree={MAX_DEGREE}
        minDegree={MIN_DEGREE}
        buttonClickHandler={buttonClickHandler}
      />
      <ModeGauge
        derived={derived}
      />
      <Clock
        derived={derived}
        buttonClickHandler={buttonClickHandler}
      />
    </svg>
  )
}
