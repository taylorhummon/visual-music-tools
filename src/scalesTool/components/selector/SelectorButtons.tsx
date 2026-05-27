import { SelectorButton } from "@scalesTool/components/selector/SelectorButton"
import { type ButtonClickHandler, ButtonSize } from "@scalesTool/utilities/button"
import { type Derived } from "@scalesTool/utilities/derived"
import { Motion } from "@scalesTool/utilities/motion"

import selectorButtonsCssModule from "./SelectorButtons.module.scss"


interface SelectorButtonsParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
  buttonClickHandler: ButtonClickHandler,
}

export function SelectorButtons({
  derived,
  maxDegree,
  minDegree,
  buttonClickHandler,
}: SelectorButtonsParameters): React.ReactNode {
  return (
    <>
      <g className={selectorButtonsCssModule["upper-buttons"]}>
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Large}
          onClickMotion={Motion.IncrementBoth}
          className={selectorButtonsCssModule["top"]}
          dataTestid="increment-both"
        />
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Small}
          onClickMotion={Motion.IncrementDegree}
          className={selectorButtonsCssModule["bottom-left"]}
          dataTestid="increment-degree"
        />
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Small}
          onClickMotion={Motion.IncrementRoot}
          className={selectorButtonsCssModule["bottom-right"]}
          dataTestid="increment-root"
        />
      </g>
      <g className={selectorButtonsCssModule["lower-buttons"]}>
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Small}
          onClickMotion={Motion.DecrementDegree}
          className={selectorButtonsCssModule["top-left"]}
          dataTestid="decrement-degree"
        />
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Small}
          onClickMotion={Motion.DecrementRoot}
          className={selectorButtonsCssModule["top-right"]}
          dataTestid="decrement-root"
        />
        <SelectorButton
          derived={derived}
          maxDegree={maxDegree}
          minDegree={minDegree}
          clickHandler={buttonClickHandler}
          size={ButtonSize.Large}
          onClickMotion={Motion.DecrementBoth}
          className={selectorButtonsCssModule["bottom"]}
          dataTestid="decrement-both"
        />
      </g>
    </>
  )
}
