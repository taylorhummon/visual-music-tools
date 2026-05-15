"use client"

import { useRef, useReducer, useEffect, useCallback } from "react"

import { Canvas } from "@scalesTool/components/Canvas"
import { SettingsPanel } from "@scalesTool/components/SettingsPanel"
import { useDerived } from "@scalesTool/utilities/derived"
import { getInitialState, reducer } from "@scalesTool/utilities/state"

import { ActionType } from "@shared/utilities/action"
import { registerEventListener } from "@shared/utilities/eventListener"
import { Motion, getNextMusicalKey } from "@shared/utilities/motion"


export function ScalesTool(
): React.ReactNode {
  const domNodeRef = useRef<HTMLDivElement>(null)
  const animationsCountRef = useRef<number>(0)
  const [ state, dispatch ] = useReducer(reducer, getInitialState())
  const { clockSettings, motion, musicalKey, nextMusicalKey } = useDerived(state)

  // When the user clicks on a selector button
  const selectorButtonClickHandler = useCallback(
    (motion: Motion) => {
      if (clockSettings.isUsingAnimation) {
        dispatch({ type: ActionType.ActivateMotion, motion })
      } else {
        dispatch({ type: ActionType.ChangeKey, nextMusicalKey: getNextMusicalKey({ musicalKey, motion }) })
      }
    },
    [ dispatch, clockSettings.isUsingAnimation, musicalKey ],
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
      dispatch({ type: ActionType.ChangeKey, nextMusicalKey })
    }
    return registerEventListener(domNodeRef.current, "animationend", animationEndHandler)
  }, [ dispatch, musicalKey, nextMusicalKey ])

  return (
    <div ref={domNodeRef}>
      <Canvas
        clockSettings={clockSettings}
        motion={motion}
        musicalKey={musicalKey}
        nextMusicalKey={nextMusicalKey}
        selectorButtonClickHandler={selectorButtonClickHandler}
      />
      <SettingsPanel
        clockSettings={clockSettings}
        dispatch={dispatch}
      />
    </div>
  )
}
