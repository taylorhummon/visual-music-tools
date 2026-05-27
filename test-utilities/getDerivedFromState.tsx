import { renderHook } from "@testing-library/react"

import { type Derived, useDerived } from "@scalesTool/utilities/derived"
import { type State } from "@scalesTool/utilities/state"


export function getDerivedFromState(
  state: State,
): Derived {
  const { result } = renderHook(() => useDerived(state))
  return result.current
}
