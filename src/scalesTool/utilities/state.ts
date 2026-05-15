import {
  DEFAULT_IS_ALPHABETICAL,
  DEFAULT_IS_USING_SOLFEGE,
  DEFAULT_IS_USING_ANIMATION,
  DEFAULT_ROOT,
  DEFAULT_DEGREE,
} from "@scalesTool/config"

import { ActionType, Action } from "@shared/utilities/action"
import { Motion } from "@shared/utilities/motion"


export interface State {
  isUsingAnimation: boolean,
  isAlphabetical: boolean,
  isUsingSolfege: boolean,
  motion: Motion,
  root: number,
  degree: number,
}

export function getInitialState(
): State {
  return {
    isUsingAnimation: DEFAULT_IS_USING_ANIMATION,
    isAlphabetical: DEFAULT_IS_ALPHABETICAL,
    isUsingSolfege: DEFAULT_IS_USING_SOLFEGE,
    motion: Motion.Still,
    root: DEFAULT_ROOT,
    degree: DEFAULT_DEGREE,
  }
}

export function reducer(
  state: State,
  action: Action,
): State {
  if (action.type === ActionType.ActivateMotion) {
    const { motion } = action
    return { ...state, motion }
  }
  if (action.type === ActionType.ChangeKey) {
    return {
      ...state,
      motion: Motion.Still,
      root: action.nextMusicalKey.root,
      degree: action.nextMusicalKey.degree,
    }
  }
  if (action.type === ActionType.SelectIsUsingAnimation) {
    const { isUsingAnimation } = action
    return { ...state, isUsingAnimation }
  }
  if (action.type === ActionType.SelectIsAlphabetical) {
    const { isAlphabetical } = action
    return { ...state, isAlphabetical }
  }
  if (action.type === ActionType.SelectIsUsingSolfege) {
    const { isUsingSolfege } = action
    return { ...state, isUsingSolfege }
  }
  return state
}
