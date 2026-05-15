import { type MusicalKey } from "@shared/classes/MusicalKey"
import { type Motion } from "@shared/utilities/motion"


export enum ActionType {
  ActivateMotion = "activate-motion",
  ChangeKey = "change-key",
  SelectIsUsingAnimation = "select-is-using-animation",
  SelectIsAlphabetical = "select-is-alphabetical",
  SelectIsUsingSolfege = "select-is-using-solfege",
}

export type Action =
  | { type: ActionType.ActivateMotion, motion: Motion }
  | { type: ActionType.ChangeKey, nextMusicalKey: MusicalKey }
  | { type: ActionType.SelectIsUsingAnimation, isUsingAnimation: boolean }
  | { type: ActionType.SelectIsAlphabetical, isAlphabetical: boolean }
  | { type: ActionType.SelectIsUsingSolfege, isUsingSolfege: boolean }
