import { type ActionDispatch } from "react"
import { Stack, Switch } from "@mantine/core"

import { type Action, ActionType } from "@scalesTool/utilities/action"
import { type ClockSettings } from "@scalesTool/utilities/clock"

import settingsPanelCssModule from "./SettingsPanel.module.scss"


interface SettingsPanelParameters {
  clockSettings: ClockSettings,
  dispatch: ActionDispatch<[action: Action]>,
}

export function SettingsPanel({
  clockSettings,
  dispatch,
}: SettingsPanelParameters): React.ReactNode {
  return (
    <Stack
      classNames={{ "root": settingsPanelCssModule["settings-panel"] }}
      align="stretch"
      gap="sm"
    >
      <Switch
        label="Degree note"
        size={SWITCH_SIZE}
        withThumbIndicator={WITH_THUMB_INDICATOR}
        checked={clockSettings.isUsingDegreeSpotlight}
        onChange={(event) => {
          dispatch({
            type: ActionType.SelectIsUsingDegreeSpotlight,
            isUsingDegreeSpotlight: event.currentTarget.checked,
          })
        }}
        data-testid="degree-spotlight-switch"
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
        data-testid="solfege-switch"
      />
    </Stack>
  )
}

const SWITCH_SIZE = "md"
const WITH_THUMB_INDICATOR = false
