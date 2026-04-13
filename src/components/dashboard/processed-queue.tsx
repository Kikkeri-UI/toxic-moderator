/**
 * Component resposible for displaying processed messages in a table
 */

import React, { useState, useEffect } from "react"
import { Report } from "@/types";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { usePagination } from "@/hooks/use-pagination";
import { PaginationComponent } from "@/components/ui/PaginationComponent"
import { ITEMS_PER_PAGE, IMPACT_STYLES } from "@/constants"

interface ProcessedQueueProps {
    reports: Report[]
}

export const ProcessedQueue = ({ reports }: ProcessedQueueProps) => {

    const { currentPage, setCurrentPage, totalPages, startIndex, paginatedData } = usePagination(reports)

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Message</TableHead>
                            <TableHead className="w-45 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Logged By</TableHead>
                            <TableHead className="w-37.5 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Toxicity Type</TableHead>
                            <TableHead className="w-30 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Impact</TableHead>
                            <TableHead className="w-45 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Comment</TableHead>
                            <TableHead className="w-30 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Updated By</TableHead>
                            <TableHead className="w-30 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Updated At</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground italic">
                                    No requests have been processed yet.
                                </TableCell>
                            </TableRow>
                        ) : (<>
                            {
                                paginatedData.map((report) => (
                                    <TableRow key={report.id} className={cn("transition-colors bg-background")}>
                                        <TableCell className="font-medium text-sm">
                                            {report.message}
                                        </TableCell>
                                        <TableCell className="text-sm text-foreground/80 italic max-w-md truncate">
                                            "{report.loggedBy}"
                                        </TableCell>
                                        <TableCell className="w-[200px]">
                                            <div className="flex flex-wrap gap-1 py-1">
                                                {report.taggingDetails?.types.map((type) => (
                                                    <Badge
                                                        key={type}
                                                        variant="secondary"
                                                        className="text-[9px] px-1.5 py-0 leading-tight bg-muted/50 border-none font-semibold text-muted-foreground whitespace-nowrap"
                                                    >
                                                        {type}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    "text-[10px] font-bold uppercase border",
                                                    IMPACT_STYLES[report.taggingDetails?.impact as keyof typeof IMPACT_STYLES] || "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {report.taggingDetails?.impact}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs italic">{report.taggingDetails?.comment}</TableCell>
                                        <TableCell className="text-xs italic">{report.taggingDetails?.updatedBy}</TableCell>
                                        <TableCell className="text-xs italic">{formatDateTime(report.taggingDetails?.processedAt)}</TableCell>

                                    </TableRow>
                                ))
                            }
                        </>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/** Pagination Controls */}
            {
                reports.length > ITEMS_PER_PAGE && (
                    <PaginationComponent startIndex={startIndex} itemsPerPage={10} totalItems={reports.length} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                )
            }
        </div>
    )

}