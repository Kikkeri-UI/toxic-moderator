/**
 * Custom hook resposible for fetching data from mock file,
 * Calculating stats according to the reports
 */

import React, { useState, useEffect, useMemo } from "react"
import { MOCK_REPORTS } from "@/data/mock"
import { Report } from "@/types"

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

    // TODO: handle update functionality 

    return { reports, stats };
}