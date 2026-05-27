import { type MusicalKey } from "@scalesTool/classes/MusicalKey"
import { type AnimationOption } from "@scalesTool/utilities/clock"
import { type Motion } from "@scalesTool/utilities/motion"


export enum ActionType {
  SelectIsUsingDegreeSpotlight = "select-is-using-degree-spotlight",
  SelectIsUsingSolfege = "select-is-using-solfege",
  SelectIsAnchoringRoot = "select-is-anchoring-root",
  SelectIsUsingAnimation = "select-is-using-animation",
  SelectAnimationOption = "select-animation-option",
  ActivateMotion = "activate-motion",
  CompleteMotion = "complete-motion",
}

export type Action =
  | { type: ActionType.SelectIsUsingDegreeSpotlight, isUsingDegreeSpotlight: boolean }
  | { type: ActionType.SelectIsUsingSolfege, isUsingSolfege: boolean }
  | { type: ActionType.SelectIsAnchoringRoot, isAnchoringRoot: boolean }
  | { type: ActionType.SelectIsUsingAnimation, isUsingAnimation: boolean }
  | { type: ActionType.SelectAnimationOption, animationOption: AnimationOption }
  | { type: ActionType.ActivateMotion, motion: Motion }
  | { type: ActionType.CompleteMotion, nextMusicalKey: MusicalKey, nextAreDucksInARow: boolean }
