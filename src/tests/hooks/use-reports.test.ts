import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useReports } from "@/hooks/use-reports"

// We mock the date to ensure "processedAt" is predictable
const MOCK_DATE = "2026-04-13T12:00:00.000Z";
vi.useFakeTimers().setSystemTime(new Date(MOCK_DATE));

describe("useReports Hook", () => {
    it("should initialize with mock data and correct stats", () => {
        const { result } = renderHook(() => useReports());

        // Basic sanity check on initial load
        expect(result.current.reports.length).toBeGreaterThan(0);
        expect(result.current.stats.total).toBe(result.current.reports.length);

        // Ensure stats are derived correctly (pending + processed + invalid should = total)
        const { pending, processed, invalid, total } = result.current.stats;
        expect(pending + processed + invalid).toBe(total);
    });

    it("should update a report to 'processed' status using updateReport", () => {
        const { result } = renderHook(() => useReports());
        const targetId = result.current.reports[0].id;
        const mockValues = {
            types: ["Violence"],
            impact: "high",
            comment: "Confirmed violation"
        };

        act(() => {
            result.current.updateReport(targetId, mockValues as any);
        });

        const updatedReport = result.current.reports.find(r => r.id === targetId);

        expect(updatedReport?.status).toBe("processed");
        expect(updatedReport?.taggingDetails?.comment).toBe("Confirmed violation");
        expect(updatedReport?.taggingDetails?.processedAt).toBe(MOCK_DATE);
        // Check if stats updated
        expect(result.current.stats.processed).toBeGreaterThan(0);
    });

    it("should update a report to 'invalid' status using rejectReport", () => {
        const { result } = renderHook(() => useReports());
        const targetId = result.current.reports[0].id;
        const mockValues = {
            impact: "none",
            comment: "False positive"
        };

        act(() => {
            result.current.rejectReport(targetId, mockValues as any);
        });

        const updatedReport = result.current.reports.find(r => r.id === targetId);

        expect(updatedReport?.status).toBe("invalid");
        expect(updatedReport?.taggingDetails?.types).toEqual([]); // Reject should clear types
        expect(result.current.stats.invalid).toBeGreaterThan(0);
    });

    it("should keep stats in sync after multiple operations", () => {
        const { result } = renderHook(() => useReports());
        const initialPending = result.current.stats.pending;

        act(() => {
            result.current.updateReport(result.current.reports[0].id, { types: [], impact: "low", comment: "" } as any);
        });

        expect(result.current.stats.pending).toBe(initialPending - 1);
        expect(result.current.stats.processed).toBeGreaterThan(0);
    });
});