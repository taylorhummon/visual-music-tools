import { getCurrentHour, getNextHour } from "@shared/utilities/clock"
import { buildClassName } from "@shared/utilities/css"
import { type Derived } from "@shared/utilities/derived"
import { Motion } from "@shared/utilities/motion"
import { type NaturalNote } from "@shared/utilities/naturalNote"

import ordinaryLabelCssModule from "./OrdinaryLabel.module.scss"


enum Animation {
  still = "still",
  move = "move",
  disappear = "disappear",
  appear = "appear",
}

interface OrdinaryLabelParameters {
  derived: Derived,
  isInside: boolean,
  naturalNote: NaturalNote,
}

export function OrdinaryLabel({
  derived,
  isInside,
  naturalNote,
}: OrdinaryLabelParameters): React.ReactNode {
  const { currentMusicalKey, nextMusicalKey, motion } = derived
  const startNote = currentMusicalKey.noteFromNaturalNote(naturalNote)
  const finishNote = nextMusicalKey.noteFromNaturalNote(naturalNote)
  const startHour = getCurrentHour(derived, startNote)
  const finishHour = getNextHour(derived, finishNote)
  if (startHour === finishHour) {
    return (
      <Label
        animation={Animation.still}
        isInside={isInside}
        naturalNote={naturalNote}
        startNoteName={startNote.name}
        finishNoteName={finishNote.name}
        startHour={startHour}
        finishHour={finishHour}
      />
    )
  }
  if (motion === Motion.ToCaterpillarPattern || motion === Motion.ToButterlflyPattern) {
    return (
      <Label
        animation={Animation.move}
        isInside={isInside}
        naturalNote={naturalNote}
        startNoteName={startNote.name}
        finishNoteName={finishNote.name}
        startHour={startHour}
        finishHour={finishHour}
      />
    )
  }
  return (
    <>
      <Label
        animation={Animation.disappear}
        isInside={isInside}
        naturalNote={naturalNote}
        startNoteName={startNote.name}
        finishNoteName={finishNote.name}
        startHour={startHour}
        finishHour={finishHour}
      />
      <Label
        animation={Animation.appear}
        isInside={isInside}
        naturalNote={naturalNote}
        startNoteName={startNote.name}
        finishNoteName={finishNote.name}
        startHour={startHour}
        finishHour={finishHour}
      />
    </>
  )
}

interface LabelParameters {
  animation: Animation,
  isInside: boolean,
  naturalNote: NaturalNote,
  startNoteName: string,
  finishNoteName: string,
  startHour: number,
  finishHour: number,
}

function Label({
  animation,
  isInside,
  naturalNote,
  startNoteName,
  finishNoteName,
  startHour,
  finishHour,
}: LabelParameters): React.ReactNode {
  const noteName = animation === Animation.disappear ? startNoteName : finishNoteName
  return (
    <g
      className={getLabelClassName(animation, isInside, startHour, finishHour)}
      data-testid={getDataTestid(animation, naturalNote)}
    >
      <g
        className={ordinaryLabelCssModule[`width-${noteName.length}`]}
      >
        <text>
          {noteName}
        </text>
      </g>
    </g>
  )
}

function getLabelClassName(
  animation: Animation,
  isInside: boolean,
  startHour: number,
  finishHour: number,
): string {
  const classNames = [ "ordinary-label" ]
  if (isInside) {
    classNames.push("inside")
  } else {
    classNames.push("outside")
  }
  if (animation === Animation.still) {
    classNames.push(`hour-${startHour}`)
  } else if (animation === Animation.move) {
    classNames.push(`move-from-${startHour}-to-${finishHour}`)
  } else if (animation === Animation.disappear) {
    classNames.push(`hour-${startHour}`)
    classNames.push("disappear")
  } else if (animation === Animation.appear) {
    classNames.push(`hour-${finishHour}`)
    classNames.push("appear")
  }
  return buildClassName(ordinaryLabelCssModule, classNames, [ "fixed-width-font" ])
}

function getDataTestid(
  animation: Animation,
  naturalNote: string,
): string {
  if (animation === Animation.still) {
    return `ordinary-label-${naturalNote}`
  }
  if (animation === Animation.move) {
    return `ordinary-label-${naturalNote}-move`
  }
  if (animation === Animation.disappear) {
    return `ordinary-label-${naturalNote}-disappear`
  }
  if (animation === Animation.appear) {
    return `ordinary-label-${naturalNote}-appear`
  }
  throw Error(`Unknown animation ${animation}`)
}
