import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePagination } from "@/hooks/use-pagination"

describe("usePagination Hook", () => {
    const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

    it("should initialize with default values (Page 1)", () => {
        const { result } = renderHook(() => usePagination(mockData, 10));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.paginatedData).toHaveLength(10);
        expect(result.current.paginatedData[0].id).toBe(1);
    });

    it("should change the current page correctly", () => {
        const { result } = renderHook(() => usePagination(mockData, 10));

        act(() => {
            result.current.setCurrentPage(2);
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.startIndex).toBe(10);
        expect(result.current.paginatedData[0].id).toBe(11);
    });

    it("should reset to page 1 when the data length changes (e.g., filtering)", () => {
        const { result, rerender } = renderHook(
            ({ data }) => usePagination(data, 10),
            { initialProps: { data: mockData } }
        );

        // Go to page 2
        act(() => { result.current.setCurrentPage(2) });
        expect(result.current.currentPage).toBe(2);

        // Simulate filtering: change the data prop to a smaller list
        const filteredData = mockData.slice(0, 5);
        rerender({ data: filteredData });

        // The useEffect in your hook should trigger here
        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(1);
    });

    it("should handle empty data correctly", () => {
        const { result } = renderHook(() => usePagination([], 10));

        expect(result.current.totalPages).toBe(1);
        expect(result.current.paginatedData).toEqual([]);
    });
});