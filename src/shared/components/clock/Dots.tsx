import { DotsAnimator } from "@shared/classes/DotsAnimator"
import { Dot } from "@shared/components/clock/Dot"
import { type Derived } from "@shared/utilities/derived"
import { SOLFEGE_LETTERS } from "@shared/utilities/solfegeLetter"


interface DotsParameters {
  derived: Derived,
}

export function Dots({
  derived,
}: DotsParameters): React.ReactNode {
  const dotsAnimator = new DotsAnimator({ derived })

  return (
    <>
      {SOLFEGE_LETTERS.map((solfegeLetter) =>
        <Dot
          key={solfegeLetter}
          derived={derived}
          dotsAnimator={dotsAnimator}
          solfegeLetter={solfegeLetter}
        />
      )}
    </>
  )
}
