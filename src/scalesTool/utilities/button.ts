import { type Motion } from "@scalesTool/utilities/motion"


export type ButtonClickHandler = (motion: Motion) => void

export enum ButtonSize {
  Large = "large",
  Small = "small",
}

export enum ButtonState {
  Ready = "ready",
  Active = "active",
  Waiting = "waiting",
  Disabled = "disabled",
}
