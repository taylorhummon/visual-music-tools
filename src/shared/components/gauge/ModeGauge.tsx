import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Highlighter } from "@shared/components/gauge/Highlighter"
import { Mode } from "@shared/components/gauge/Mode"
import { MODES } from "@shared/utilities/mode"

import modeGaugeCssModule from "./ModeGauge.module.scss"


interface ModeGaugeParameters {
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
}

export function ModeGauge({
  currentMusicalKey,
  nextMusicalKey,
}: ModeGaugeParameters): React.ReactNode {
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
