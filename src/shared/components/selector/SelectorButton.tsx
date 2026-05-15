import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Icon } from "@shared/components/selector/Icon"
import { buildClassName } from "@shared/utilities/css"
import { Motion, canPerformMotion } from "@shared/utilities/motion"
import {
  type SelectorButtonClickHandler,
  SelectorButtonSize,
  SelectorButtonState,
} from "@shared/utilities/selector"

import selectorButtonCssModule from "./SelectorButton.module.scss"


interface SelectorButtonInput {
  maxDegree: number,
  minDegree: number,
  motion: Motion,
  musicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
  clickHandler: SelectorButtonClickHandler,
  size: SelectorButtonSize,
  onClickMotion: Motion,
  className?: string,
  dataTestid: string,
}

export function SelectorButton({
  maxDegree,
  minDegree,
  motion,
  musicalKey,
  nextMusicalKey,
  clickHandler,
  size,
  onClickMotion,
  className,
  dataTestid,
}: SelectorButtonInput): React.ReactNode {
  return (
    <g className={getClassName(className)}>
      <Icon
        motion={onClickMotion}
      />
      <ButtonRectangle
        maxDegree={maxDegree}
        minDegree={minDegree}
        motion={motion}
        musicalKey={musicalKey}
        nextMusicalKey={nextMusicalKey}
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

interface ButtonRectangleInput {
  maxDegree: number,
  minDegree: number,
  motion: Motion,
  musicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
  clickHandler: SelectorButtonClickHandler,
  size: SelectorButtonSize,
  onClickMotion: Motion,
  dataTestid: string,
}

function ButtonRectangle({
  maxDegree,
  minDegree,
  motion,
  nextMusicalKey,
  clickHandler,
  size,
  onClickMotion,
  dataTestid,
}: ButtonRectangleInput) {
  const width = size === SelectorButtonSize.Large ? 98 : 46
  const x = - width / 2
  const buttonState = getButtonState({ maxDegree, minDegree, nextMusicalKey, onClickMotion, motion })

  return (
    <rect
      className={buildClassName(selectorButtonCssModule, [ "rectangle", buttonState ])}
      onClick={() => {
        if (buttonState === SelectorButtonState.Ready) {
          clickHandler(onClickMotion)
        }
      }}
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

interface getButtonStateInput {
  maxDegree: number,
  minDegree: number,
  nextMusicalKey: MusicalKey,
  onClickMotion: Motion,
  motion: Motion,
}

function getButtonState({
  maxDegree,
  minDegree,
  nextMusicalKey,
  onClickMotion,
  motion,
}: getButtonStateInput): SelectorButtonState {
  if (! canPerformMotion({
    maxDegree,
    minDegree,
    musicalKey: nextMusicalKey,
    motion: onClickMotion,
  })) {
    return SelectorButtonState.Disabled
  }
  if (motion === onClickMotion) {
    return SelectorButtonState.Active
  }
  if (motion !== Motion.Still) {
    return SelectorButtonState.Waiting
  }
  return SelectorButtonState.Ready
}
