import { Highlighter } from "@scalesTool/components/selector/Highlighter"
import { DegreeSelector } from "@scalesTool/components/selector/DegreeSelector"
import { RootSelector } from "@scalesTool/components/selector/RootSelector"
import { SelectorButtons } from "@scalesTool/components/selector/SelectorButtons"
import { type ButtonClickHandler } from "@scalesTool/utilities/button"
import { type Derived } from "@scalesTool/utilities/derived"

import selectorsCssModule from "./Selectors.module.scss"


interface SelectorsParameters {
  derived: Derived,
  maxDegree: number,
  minDegree: number,
  buttonClickHandler: ButtonClickHandler,
}

export function Selectors({
  derived,
  maxDegree,
  minDegree,
  buttonClickHandler,
}: SelectorsParameters): React.ReactNode {
  return (
    <g className={selectorsCssModule["selectors"]}>
      <defs>
        <clipPath id="selectors-clip-path">
          <rect
            x="-30"
            y="-103"
            width="60"
            height="206"
          />
        </clipPath>
      </defs>
      <SelectorButtons
        derived={derived}
        maxDegree={maxDegree}
        minDegree={minDegree}
        buttonClickHandler={buttonClickHandler}
      />
      <Highlighter />
      <DegreeSelector
        derived={derived}
        maxDegree={maxDegree}
        minDegree={minDegree}
      />
      <RootSelector
        derived={derived}
        maxDegree={maxDegree}
        minDegree={minDegree}
      />
    </g>
  )
}
