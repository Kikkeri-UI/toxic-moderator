/**
 * Custom hook resposible for fetching data from mock file,
 * Calculating stats according to the reports
 */

import { useState, useMemo } from "react"
import { MOCK_REPORTS } from "@/data/mock"
import { Report, ToxicityType } from "@/types"
import { TaggingFormValues } from "@/lib/validations/tagging"

export const useReports = () => {
    const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)


    /**
     * Calculate all the necessary stats to show in the dashboard
     * only when the reports change.
     */
    const stats = useMemo(() => ({
        total: reports.length,
        pending: reports.filter((report) => report.status === "pending").length,
        processed: reports.filter((report) => report.status === "processed").length,
        invalid: reports.filter((report) => report.status === "invalid").length
    }), [reports])

    /**
     * 
     * @param id id of the report
     * @param values form values from the tagging modal
     */
    const updateReport = (id: string, values: TaggingFormValues) => {
        setReports((prev) =>
            prev.map((report): Report =>
                report.id === id
                    ? {
                        ...report,
                        status: "processed" as const,
                        taggingDetails: {
                            ...values,
                            types: values.types as ToxicityType[],
                            impact: values.impact,
                            comment: values.comment || "",
                            updatedBy: "Current User",
                            processedAt: new Date().toISOString(),
                        },
                    }
                    : report
            )
        );
    };

    return { reports, stats, updateReport };
}