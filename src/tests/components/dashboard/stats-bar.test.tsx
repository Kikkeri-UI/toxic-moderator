import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsBar } from "@/components/dashboard/stats-bar";

describe("StatsBar Component", () => {
    const mockStats = {
        total: 100,
        pending: 40,
        processed: 50,
        invalid: 10
    };

    it("renders all four stat cards", () => {
        render(<StatsBar stats={mockStats} />);

        expect(screen.getByText(/Total Reports/i)).toBeInTheDocument();
        expect(screen.getByText(/Pending Review/i)).toBeInTheDocument();
        expect(screen.getByText(/Processed/i)).toBeInTheDocument();
        expect(screen.getByText(/Invalid/i)).toBeInTheDocument();
    });

    it("displays the correct numerical values from props", () => {
        render(<StatsBar stats={mockStats} />);

        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.getByText("40")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("applies the correct variant classes for visual feedback", () => {
        const { container } = render(<StatsBar stats={mockStats} />);

        // Find the "Pending Review" value (40)
        const pendingValue = screen.getByText("40");
        // It should have the warning class (text-impact-high)
        expect(pendingValue).toHaveClass("text-impact-high");

        // Find the "Invalid" value (10)
        const invalidValue = screen.getByText("10");
        // It should have the destructive class (text-impact-critical)
        expect(invalidValue).toHaveClass("text-impact-critical");
    });

    it("renders the correct description for each card", () => {
        render(<StatsBar stats={mockStats} />);

        expect(screen.getByText(/Messages awaiting moderator action/i)).toBeInTheDocument();
        expect(screen.getByText(/Successfully tagged and archived/i)).toBeInTheDocument();
    });
});