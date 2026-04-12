/**
 * component responsible for handling pagination.
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

interface PaginationProps {
    startIndex: number;
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

export const PaginationComponent = ({
    startIndex,
    itemsPerPage,
    totalItems,
    currentPage,
    setCurrentPage,
    totalPages
}: PaginationProps) => {
    const from = totalItems === 0 ? 0 : startIndex + 1;
    const to = Math.min(startIndex + itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between px-2">
            <p className="text-xs text-muted-foreground font-medium">
                Showing <span className="text-foreground">{from}</span> to <span className="text-foreground">{to}</span> of <span className="text-foreground">{totalItems}</span> reports
            </p>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 cursor-pointer"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="text-xs font-semibold">
                    Page {currentPage} of {totalPages}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalItems === 0}
                    className="h-8 w-8 p-0 cursor-pointer"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}