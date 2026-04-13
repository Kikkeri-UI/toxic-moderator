import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce Hook", () => {
    beforeEach(() => {
        vi.useFakeTimers(); // Intercept setTimeout calls
    });

    afterEach(() => {
        vi.useRealTimers(); // Clean up after tests
    });

    it("should return initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));

        // useEffect runs after render, so initial value will be ""
        expect(result.current).toBe("");
    });

    it("should update value only after the specified delay", () => {
        const { result, rerender } = renderHook(
            ({ term }) => useDebounce(term, 500),
            { initialProps: { term: "test" } }
        );

        // Fast-forward 200ms - should NOT have updated yet
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(result.current).toBe("");

        // Fast-forward another 300ms (Total 500ms)
        act(() => {
            vi.advanceTimersByTime(300);
        });
        expect(result.current).toBe("test");
    });

    it("should clear previous timer when value changes rapidly", () => {
        const { result, rerender } = renderHook(
            ({ term }) => useDebounce(term, 500),
            { initialProps: { term: "a" } }
        );

        // Change value to 'ab' after 200ms
        act(() => {
            vi.advanceTimersByTime(200);
        });
        rerender({ term: "ab" });

        // Fast-forward another 400ms (Total 600ms from start)
        act(() => {
            vi.advanceTimersByTime(400);
        });
        expect(result.current).toBe("");

        // Final leap to finish the 'ab' timer
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current).toBe("ab");
    });
});