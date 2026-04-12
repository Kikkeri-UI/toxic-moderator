/**
 * custom hook to handle pagination caclculations
 */

import { useState, useEffect, useMemo } from "react"

export const usePagination = <T>(data: T[], itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(1)
    }, [data.length])

    const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage))

    const startIndex = (currentPage - 1) * itemsPerPage

    const paginatedData = useMemo(() => {
        return data.slice(startIndex, startIndex + itemsPerPage)
    }, [data, startIndex, itemsPerPage])

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        startIndex,
        paginatedData,
        itemsPerPage // Return this so the component knows the size
    }
}