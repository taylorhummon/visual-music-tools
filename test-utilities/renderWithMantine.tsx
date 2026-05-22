import { render } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"


interface wrapperParameters {
  children: React.ReactNode,
}

export function renderWithMantine(
  ui: React.ReactNode,
) {
  return render(
    <>{ui}</>,
    {
      wrapper: ({ children }: wrapperParameters) => (
        <MantineProvider env="test">
          {children}
        </MantineProvider>
      ),
    }
  );
}
