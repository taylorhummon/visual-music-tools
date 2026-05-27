import { type ButtonClickHandler, ButtonState } from "@scalesTool/utilities/button"
import { buildClassName } from "@scalesTool/utilities/css"
import { type Derived } from "@scalesTool/utilities/derived"
import { Motion } from "@scalesTool/utilities/motion"

import swapButtonCssModule from "./SwapButton.module.scss"


interface SwapButtonParameters {
  derived: Derived,
  clickHandler: ButtonClickHandler,
}

export function SwapButton({
  derived,
  clickHandler,
}: SwapButtonParameters): React.ReactNode {
  return (
    <g className={swapButtonCssModule["swap-button"]}>
      <text
        textAnchor="middle"
        dominantBaseline="central"
      >
        Swap!
      </text>
      <ButtonRectangle
        derived={derived}
        clickHandler={clickHandler}
      />
    </g>
  )
}

interface ButtonRectangleParameters {
  derived: Derived,
  clickHandler: ButtonClickHandler,
}

function ButtonRectangle({
  derived,
  clickHandler,
}: ButtonRectangleParameters) {
  const { motion, currentAreDucksInARow } = derived
  const width = 140
  const x = - width / 2
  const buttonState = getButtonState(motion)

  function onClick() {
    if (buttonState !== ButtonState.Ready) return
    if (currentAreDucksInARow) {
      clickHandler(Motion.ExplodeDucks)
    } else {
      clickHandler(Motion.ArrangeDucks)
    }
  }

  return (
    <rect
      className={buildClassName(swapButtonCssModule, [ "rectangle", buttonState ])}
      onClick={onClick}
      data-testid="swap-button"
      width={width}
      height="40"
      x={x}
      y="-20"
      rx="8"
      ry="8"
    />
  )
}

function getButtonState(
  motion: Motion
): ButtonState {
  if (motion === Motion.ArrangeDucks || motion === Motion.ExplodeDucks) {
    return ButtonState.Active
  }
  if (motion !== Motion.Still) {
    return ButtonState.Waiting
  }
  return ButtonState.Ready
}
