import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaggingModal } from "@/components/dashboard/tagging-modal";
import { Report } from "@/types";

const mockReport: Report = {
    id: "123",
    loggedBy: "SystemScanner",
    message: "Bad word detected",
    status: "pending",
};

describe("TaggingModal Component", () => {
    const mockOnSubmit = vi.fn();
    const mockOnReject = vi.fn();
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders report details when open", () => {
        render(
            <TaggingModal
                report={mockReport}
                isOpen={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                onReject={mockOnReject}
            />
        );

        expect(screen.getByText(/"Bad word detected"/i)).toBeInTheDocument();
        expect(screen.getByText(/"SystemScanner"/i)).toBeInTheDocument();
    });

    it("adds a custom label to the types array on submit", async () => {
        render(
            <TaggingModal
                report={mockReport}
                isOpen={true}
                onClose={vi.fn()}
                onSubmit={mockOnSubmit}
                onReject={vi.fn()}
            />
        );

        // Since the current zod schema requires selection of atleast one 
        // toxicity type, select the first one and move on.
        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);

        // 2. Type into the custom label input
        const customInput = screen.getByPlaceholderText(/e.g., Stream Sniping/i);
        fireEvent.change(customInput, { target: { value: "CustomViolation" } });

        // 3. Submit the form
        const submitBtn = screen.getByText(/Confirm Tag/i);
        fireEvent.click(submitBtn);

        // 4. Use waitFor because React Hook Form validation is async
        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                "123",
                expect.objectContaining({
                    // It should contain the checked one AND the custom one
                    types: expect.arrayContaining(["CustomViolation"])
                })
            );
        }, { timeout: 2000 });
    });

    it("calls onReject with 'Invalid/Dismissed' if no types are selected", async () => {
        render(
            <TaggingModal
                report={mockReport}
                isOpen={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                onReject={mockOnReject}
            />
        );

        const rejectBtn = screen.getByText(/Mark Invalid/i);
        fireEvent.click(rejectBtn);

        await waitFor(() => {
            expect(mockOnReject).toHaveBeenCalledWith("123", expect.objectContaining({
                types: ["Invalid/Dismissed"]
            }));
        });
    });

    it("resets the form when the report changes (Edit Mode)", async () => {
        const { rerender } = render(
            <TaggingModal report={mockReport} isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} onReject={vi.fn()} />
        );

        const processedReport: Report = {
            ...mockReport,
            taggingDetails: {
                types: ["Abuse"],
                impact: "High",
                comment: "Pre-existing comment",
                updatedBy: "Admin",
                processedAt: "2026-04-13"
            }
        };

        // Change the report prop to trigger the useEffect
        rerender(<TaggingModal report={processedReport} isOpen={true} onClose={vi.fn()} onSubmit={vi.fn()} onReject={vi.fn()} />);

        // Check if textarea updated with existing comment
        const textarea = screen.getByPlaceholderText(/Why did you choose these tags?/i);
        expect(textarea.innerHTML).toBe("Pre-existing comment");
    });
});