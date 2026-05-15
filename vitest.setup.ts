import { vi, afterEach } from "vitest"
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react"


afterEach(() => {
  cleanup()
})


/*** The following mocks are needed for testing components that use Mantine ***/

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

Object.defineProperty(document, "fonts", {
  value: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
