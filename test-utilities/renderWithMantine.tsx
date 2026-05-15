import { render } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"


interface wrapperInput {
  children: React.ReactNode,
}

export function renderWithMantine(
  ui: React.ReactNode,
) {
  return render(
    <>{ui}</>,
    {
      wrapper: ({ children }: wrapperInput) => (
        <MantineProvider env="test">
          {children}
        </MantineProvider>
      ),
    }
  );
}
