import { Highlighter } from "@scalesTool/components/gauge/Highlighter"
import { Mode } from "@scalesTool/components/gauge/Mode"
import { type Derived } from "@scalesTool/utilities/derived"
import { MODES } from "@scalesTool/utilities/mode"

import modeGaugeCssModule from "./ModeGauge.module.scss"


interface ModeGaugeParameters {
  derived: Derived,
}

export function ModeGauge({
  derived,
}: ModeGaugeParameters): React.ReactNode {
  const { currentMusicalKey, nextMusicalKey } = derived
  const currentMode = currentMusicalKey.mode
  const nextMode = nextMusicalKey.mode

  return (
    <g className={modeGaugeCssModule["mode-gauge"]}>
      <text className={modeGaugeCssModule["label"]}>
        Mode
      </text>
      <Highlighter
        currentMode={currentMode}
        nextMode={nextMode}
      />
      <g className={modeGaugeCssModule["mode-gauge-inner"]}>
        {MODES.map((mode) => (
          <Mode
            key={mode}
            currentMode={currentMode}
            nextMode={nextMode}
            mode={mode}
          />
        ))}
      </g>
    </g>
  )
}
