import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
    cleanup()
})

class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

// Use globalThis instead of global
(globalThis as any).ResizeObserver = ResizeObserverMock;

// Radix UI Dialogs also occasionally look for PointerEvent
if (!(globalThis as any).PointerEvent) {
    class PointerEventMock extends Event {
        constructor(type: string, props: EventInit = {}) {
            super(type, props);
        }
    }
    // @ts-ignore
    (globalThis as any).PointerEvent = PointerEventMock;
}