import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MessageTable } from "@/components/dashboard/message-queue"
import { Report } from "@/types";

// Mock data for our tests
const mockReports: Report[] = [
    {
        id: "1",
        loggedBy: "User A",
        message: "This is a test message",
        status: "pending",
    },
    {
        id: "2",
        loggedBy: "User B",
        message: "Processed message",
        status: "processed",
        taggingDetails: {
            types: ["Abuse"],
            impact: "High",
            comment: "Looks bad",
            updatedBy: "Admin",
            processedAt: "2026-01-01"
        }
    }
];

describe("MessageTable Component", () => {
    it("renders the table headers correctly", () => {
        render(<MessageTable reports={mockReports} onTag={vi.fn()} />);

        expect(screen.getByText(/Logged By/i)).toBeInTheDocument();
        expect(screen.getByText(/Toxicity Type/i)).toBeInTheDocument();
        expect(screen.getByText(/Status/i)).toBeInTheDocument();
    });

    it("renders the correct number of rows based on data", () => {
        render(<MessageTable reports={mockReports} onTag={vi.fn()} />);

        // We expect 2 rows in the body (excluding header)
        const rows = screen.getAllByRole("row");
        // headers + 2 data rows = 3 rows total
        expect(rows).toHaveLength(3);
    });

    it("shows 'Tag' button for pending reports and 'Edit' for processed reports", () => {
        render(<MessageTable reports={mockReports} onTag={vi.fn()} />);

        expect(screen.getByText("Tag")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("calls onTag handler when button is clicked", () => {
        const mockOnTag = vi.fn();
        render(<MessageTable reports={mockReports} onTag={mockOnTag} />);

        const tagButton = screen.getByText("Tag");
        fireEvent.click(tagButton);

        expect(mockOnTag).toHaveBeenCalledWith(mockReports[0]);
    });

    it("displays empty state message when no reports are provided", () => {
        render(<MessageTable reports={[]} onTag={vi.fn()} />);

        expect(screen.getByText(/No pending reports to display/i)).toBeInTheDocument();
    });

    it("displays badges for toxicity types on processed reports", () => {
        render(<MessageTable reports={mockReports} onTag={vi.fn()} />);

        expect(screen.getByText("Abuse")).toBeInTheDocument();
    });
});