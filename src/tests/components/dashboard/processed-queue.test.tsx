import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProcessedQueue } from "@/components/dashboard/processed-queue";
import { Report } from "@/types";

// Mock the format utility so we aren't dependent on exact locale formatting in tests
vi.mock("@/lib/utils", async () => {
    const actual = await vi.importActual("@/lib/utils");
    return {
        ...actual,
        formatDateTime: vi.fn((date) => `FORMATTED: ${date}`),
    };
});

const mockProcessedReports: Report[] = [
    {
        id: "p1",
        loggedBy: "System",
        message: "Toxic comment found",
        status: "processed",
        taggingDetails: {
            types: ["Abuse"],
            impact: "High",
            comment: "Confirmed by admin",
            updatedBy: "Moderator X",
            processedAt: "2026-04-13T12:00:00Z"
        }
    }
];

describe("ProcessedQueue Component", () => {
    it("renders table headers specific to processed data", () => {
        render(<ProcessedQueue reports={mockProcessedReports} />);

        expect(screen.getByRole("columnheader", { name: /comment/i })).toBeInTheDocument();
        expect(screen.getByText(/Updated By/i)).toBeInTheDocument();
        expect(screen.getByText(/Updated At/i)).toBeInTheDocument();
    });

    it("displays moderator comments and name correctly", () => {
        render(<ProcessedQueue reports={mockProcessedReports} />);

        expect(screen.getByText("Confirmed by admin")).toBeInTheDocument();
        expect(screen.getByText("Moderator X")).toBeInTheDocument();
    });

    it("uses the formatDateTime utility for the timestamp", () => {
        render(<ProcessedQueue reports={mockProcessedReports} />);

        // Check if our mocked format function was called
        expect(screen.getByText(/FORMATTED: 2026-04-13/)).toBeInTheDocument();
    });

    it("shows the 'no requests' empty state correctly", () => {
        render(<ProcessedQueue reports={[]} />);

        expect(screen.getByText(/No requests have been processed yet/i)).toBeInTheDocument();
    });

    it("hides pagination controls when data is less than ITEMS_PER_PAGE", () => {
        // Since ITEMS_PER_PAGE is 10 and we have 1 report
        render(<ProcessedQueue reports={mockProcessedReports} />);

        // The PaginationComponent shouldn't render (per your conditional logic)
        const showingText = screen.queryByText(/Showing/i);
        expect(showingText).not.toBeInTheDocument();
    });
});