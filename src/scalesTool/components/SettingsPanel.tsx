import { type ActionDispatch } from "react"
import { Stack, Switch } from "@mantine/core"

import { type Action, ActionType } from "@shared/utilities/action"
import { type ClockSettings } from "@shared/utilities/clock"

import settingsPanelCssModule from "./SettingsPanel.module.scss"


interface SettingsPanelInput {
  clockSettings: ClockSettings,
  dispatch: ActionDispatch<[action: Action]>,
}

export function SettingsPanel({
  clockSettings,
  dispatch,
}: SettingsPanelInput): React.ReactNode {
  return (
    <Stack
      classNames={{ "root": settingsPanelCssModule["settings-panel"] }}
      align="stretch"
      gap="sm"
    >
      <Switch
        label="Animation"
        size={SWITCH_SIZE}
        withThumbIndicator={WITH_THUMB_INDICATOR}
        checked={clockSettings.isUsingAnimation}
        onChange={(event) => {
          dispatch({
            type: ActionType.SelectIsUsingAnimation,
            isUsingAnimation: event.currentTarget.checked,
          })
        }}
        data-testid="animation-switch"
      />
      <Switch
        label="Alphabetical"
        size={SWITCH_SIZE}
        withThumbIndicator={WITH_THUMB_INDICATOR}
        checked={clockSettings.isAlphabetical}
        onChange={(event) => {
          dispatch({
            type: ActionType.SelectIsAlphabetical,
            isAlphabetical: event.currentTarget.checked,
          })
        }}
      />
      <Switch
        label="Solfège"
        size={SWITCH_SIZE}
        withThumbIndicator={WITH_THUMB_INDICATOR}
        checked={clockSettings.isUsingSolfege}
        onChange={(event) => {
          dispatch({
            type: ActionType.SelectIsUsingSolfege,
            isUsingSolfege: event.currentTarget.checked,
          })
        }}
      />
    </Stack>
  )
}

const SWITCH_SIZE = "md"
const WITH_THUMB_INDICATOR = false
