import { Icon } from "@scalesTool/components/selector/Icon"
import { type ButtonClickHandler, ButtonSize, ButtonState } from "@scalesTool/utilities/button"
import { buildClassName } from "@scalesTool/utilities/css"
import { type Derived } from "@scalesTool/utilities/derived"
import { Motion, canPerformMotion } from "@scalesTool/utilities/motion"

import selectorButtonCssModule from "./SelectorButton.module.scss"


interface SelectorButtonParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
  clickHandler: ButtonClickHandler,
  size: ButtonSize,
  onClickMotion: Motion,
  className?: string,
  dataTestid: string,
}

export function SelectorButton({
  derived,
  maxDegree,
  minDegree,
  clickHandler,
  size,
  onClickMotion,
  className,
  dataTestid,
}: SelectorButtonParameters): React.ReactNode {
  return (
    <g className={getClassName(className)}>
      <Icon
        motion={onClickMotion}
      />
      <ButtonRectangle
        maxDegree={maxDegree}
        minDegree={minDegree}
        derived={derived}
        clickHandler={clickHandler}
        size={size}
        onClickMotion={onClickMotion}
        dataTestid={dataTestid}
      />
    </g>
  )
}

function getClassName(
  className?: string,
): string {
  return [
    selectorButtonCssModule["button"],
    className,
  ].filter(
    (className) => className !== undefined
  ).join(" ")
}

interface ButtonRectangleParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
  clickHandler: ButtonClickHandler,
  size: ButtonSize,
  onClickMotion: Motion,
  dataTestid: string,
}

function ButtonRectangle({
  derived,
  maxDegree,
  minDegree,
  clickHandler,
  size,
  onClickMotion,
  dataTestid,
}: ButtonRectangleParameters) {
  const width = size === ButtonSize.Large ? 98 : 46
  const x = - width / 2
  const buttonState = getButtonState({ derived, maxDegree, minDegree, onClickMotion })

  function onClick() {
    if (buttonState !== ButtonState.Ready) return
    clickHandler(onClickMotion)
  }

  return (
    <rect
      className={buildClassName(selectorButtonCssModule, [ "rectangle", buttonState ])}
      onClick={onClick}
      data-testid={dataTestid}
      width={width}
      height="40"
      x={x}
      y="-20"
      rx="8"
      ry="8"
    />
  )
}

interface getButtonStateParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
  onClickMotion: Motion,
}

function getButtonState({
  derived,
  maxDegree,
  minDegree,
  onClickMotion,
}: getButtonStateParameters): ButtonState {
  const { motion, nextMusicalKey } = derived
  if (! canPerformMotion({
    motion: onClickMotion,
    musicalKey: nextMusicalKey,
    maxDegree,
    minDegree,
  })) {
    return ButtonState.Disabled
  }
  if (motion === onClickMotion) {
    return ButtonState.Active
  }
  if (motion !== Motion.Still) {
    return ButtonState.Waiting
  }
  return ButtonState.Ready
}
