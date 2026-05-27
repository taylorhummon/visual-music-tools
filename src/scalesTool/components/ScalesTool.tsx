"use client"

import { useRef, useReducer, useEffect, useCallback } from "react"

import { Canvas } from "@scalesTool/components/Canvas"
import { SettingsPanel } from "@scalesTool/components/SettingsPanel"
import { ActionType } from "@scalesTool/utilities/action"
import { useDerived } from "@scalesTool/utilities/derived"
import { registerEventListener } from "@scalesTool/utilities/eventListener"
import { Motion, getNextMusicalKey, getNextAreDucksInARow } from "@scalesTool/utilities/motion"
import { getInitialState, reducer } from "@scalesTool/utilities/state"


export function ScalesTool(
): React.ReactNode {
  const domNodeRef = useRef<HTMLDivElement>(null)
  const animationsCountRef = useRef<number>(0)
  const [ state, dispatch ] = useReducer(reducer, getInitialState())
  const derived = useDerived(state)
  const {
    clockSettings,
    motion,
    currentMusicalKey,
    nextMusicalKey,
    currentAreDucksInARow,
    nextAreDucksInARow,
  } = derived

  // When the user clicks on a button
  const buttonClickHandler = useCallback(
    (motion: Motion) => {
      if (clockSettings.isUsingAnimation) {
        dispatch({ type: ActionType.ActivateMotion, motion })
      } else {
        dispatch({
          type: ActionType.CompleteMotion,
          nextMusicalKey: getNextMusicalKey({ motion, currentMusicalKey }),
          nextAreDucksInARow: getNextAreDucksInARow({ motion, currentAreDucksInARow }),
        })
      }
    },
    [ dispatch, clockSettings.isUsingAnimation, currentMusicalKey, currentAreDucksInARow ],
  )

  // Count how many animations are runnning
  useEffect(() => {
    function animationStartHandler(): void {
      animationsCountRef.current += 1
    }
    return registerEventListener(domNodeRef.current, "animationstart", animationStartHandler)
  })

  // What to do when an animation ends
  useEffect(() => {
    function animationEndHandler(): void {
      animationsCountRef.current -= 1
      if (animationsCountRef.current >= 1) return
      dispatch({ type: ActionType.CompleteMotion, nextMusicalKey, nextAreDucksInARow })
    }
    return registerEventListener(domNodeRef.current, "animationend", animationEndHandler)
  }, [ dispatch, motion, nextMusicalKey, nextAreDucksInARow ])

  return (
    <div ref={domNodeRef}>
      <Canvas
        derived={derived}
        buttonClickHandler={buttonClickHandler}
      />
      <SettingsPanel
        clockSettings={clockSettings}
        dispatch={dispatch}
      />
    </div>
  )
}
