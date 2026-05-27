import {
  DEFAULT_IS_USING_DEGREE_SPOTLIGHT,
  DEFAULT_IS_USING_SOLFEGE,
  DEFAULT_IS_ANCHORING_ROOT,
  DEFAULT_IS_USING_ANIMATION,
  DEFAULT_ANIMATION_OPTION,
  DEFAULT_ARE_DUCKS_IN_A_ROW,
  DEFAULT_ROOT,
  DEFAULT_DEGREE,
} from "@scalesTool/config"
import { ActionType, Action } from "@scalesTool/utilities/action"
import { type AnimationOption } from "@scalesTool/utilities/clock"
import { Motion } from "@scalesTool/utilities/motion"


export interface State {
  isUsingDegreeSpotlight: boolean,
  isUsingSolfege: boolean,
  isAnchoringRoot: boolean,
  isUsingAnimation: boolean,
  animationOption: AnimationOption,
  motion: Motion,
  root: number,
  degree: number,
  areDucksInARow: boolean,
}

export function getInitialState(
): State {
  return {
    isUsingDegreeSpotlight: DEFAULT_IS_USING_DEGREE_SPOTLIGHT,
    isUsingSolfege: DEFAULT_IS_USING_SOLFEGE,
    isAnchoringRoot: DEFAULT_IS_ANCHORING_ROOT,
    isUsingAnimation: DEFAULT_IS_USING_ANIMATION,
    animationOption: DEFAULT_ANIMATION_OPTION,
    motion: Motion.Still,
    root: DEFAULT_ROOT,
    degree: DEFAULT_DEGREE,
    areDucksInARow: DEFAULT_ARE_DUCKS_IN_A_ROW,
  }
}

export function reducer(
  state: State,
  action: Action,
): State {
  if (action.type === ActionType.SelectIsUsingDegreeSpotlight) {
    const { isUsingDegreeSpotlight } = action
    return { ...state, isUsingDegreeSpotlight }
  }
  if (action.type === ActionType.SelectIsUsingSolfege) {
    const { isUsingSolfege } = action
    return { ...state, isUsingSolfege }
  }
  if (action.type === ActionType.SelectIsAnchoringRoot) {
    const { isAnchoringRoot } = action
    return { ...state, isAnchoringRoot }
  }
  if (action.type === ActionType.SelectIsUsingAnimation) {
    const { isUsingAnimation } = action
    return { ...state, isUsingAnimation }
  }
  if (action.type === ActionType.SelectAnimationOption) {
    const { animationOption } = action
    return { ...state, animationOption }
  }
  if (action.type === ActionType.ActivateMotion) {
    const { motion } = action
    return { ...state, motion }
  }
  if (action.type === ActionType.CompleteMotion) {
    const { nextMusicalKey, nextAreDucksInARow } = action
    return {
      ...state,
      motion: Motion.Still,
      root: nextMusicalKey.root,
      degree: nextMusicalKey.degree,
      areDucksInARow: nextAreDucksInARow,
    }
  }
  return state
}
