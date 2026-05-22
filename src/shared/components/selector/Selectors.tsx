import { type MusicalKey } from "@shared/classes/MusicalKey"
import { Highlighter } from "@shared/components/selector/Highlighter"
import { DegreeSelector } from "@shared/components/selector/DegreeSelector"
import { RootSelector } from "@shared/components/selector/RootSelector"
import { SelectorButtons } from "@shared/components/selector/SelectorButtons"
import { type Motion } from "@shared/utilities/motion"
import { type SelectorButtonClickHandler } from "@shared/utilities/selector"

import selectorsCssModule from "./Selectors.module.scss"


interface SelectorsParameters {
  maxDegree: number,
  minDegree: number,
  motion: Motion,
  currentMusicalKey: MusicalKey,
  nextMusicalKey: MusicalKey,
  selectorButtonClickHandler: SelectorButtonClickHandler,
}

export function Selectors({
  maxDegree,
  minDegree,
  motion,
  currentMusicalKey,
  nextMusicalKey,
  selectorButtonClickHandler,
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
        maxDegree={maxDegree}
        minDegree={minDegree}
        motion={motion}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
        selectorButtonClickHandler={selectorButtonClickHandler}
      />
      <Highlighter />
      <DegreeSelector
        maxDegree={maxDegree}
        minDegree={minDegree}
        motion={motion}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
      <RootSelector
        maxDegree={maxDegree}
        minDegree={minDegree}
        motion={motion}
        currentMusicalKey={currentMusicalKey}
        nextMusicalKey={nextMusicalKey}
      />
    </g>
  )
}
