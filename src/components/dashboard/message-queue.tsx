/**
 * Component resposible for displaying all the messages
 * in a table format. 
 */

import { useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Report } from "@/types";
import { Tag, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/use-pagination";
import { IMPACT_STYLES } from "@/constants"
import { PaginationComponent } from "../ui/PaginationComponent";
import { ITEMS_PER_PAGE } from "@/constants"

interface MessageTableProps {
    reports: Report[];
    onTag: (report: Report) => void;
}

export function MessageTable({ reports, onTag }: MessageTableProps) {

    const { currentPage, setCurrentPage, totalPages, startIndex, paginatedData } = usePagination(reports)

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-15 text-center font-bold">#</TableHead>
                            <TableHead className="w-45 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Logged By</TableHead>
                            <TableHead className="font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Message</TableHead>
                            <TableHead className="w-37.5 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Toxicity Type</TableHead>
                            <TableHead className="w-30 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Impact</TableHead>
                            <TableHead className="w-30 font-semibold uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                            <TableHead className="w-25 text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground italic">
                                    No pending reports to display.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((report, index) => {

                                const isProcessed = report.status === "processed"
                                const isInvalid = report.status === "invalid"

                                return (
                                    <TableRow key={report.id} className={cn("transition-colors", (isProcessed || isInvalid) ? "bg-muted opacity-80" : "bg-background")}>
                                        <TableCell className="text-center font-mono text-xs text-muted-foreground">
                                            {startIndex + index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium text-sm">
                                            {report.loggedBy}
                                        </TableCell>
                                        <TableCell className="text-sm text-foreground/80 italic max-w-md truncate">
                                            "{report.message}"
                                        </TableCell>
                                        {
                                            isProcessed ? <TableCell className="w-[200px]">
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
                                            </TableCell> : (
                                                <TableCell className="text-muted-foreground/30 text-xs italic">—</TableCell>
                                            )
                                        }

                                        {
                                            isProcessed ? (
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
                                            )
                                                : (
                                                    <TableCell className="text-muted-foreground/30 text-xs italic">—</TableCell>
                                                )
                                        }





                                        <TableCell>
                                            <Badge className={cn(
                                                "text-[10px] font-bold uppercase border",
                                                // 1. Processed Style
                                                report.status === "processed" && "bg-blue-50 text-blue-700 border-blue-200",

                                                // 2. Invalid Style
                                                report.status === "invalid" && "bg-red-50 text-red-700 border-red-200",

                                                // 3. Pending/Untagged Style
                                                report.status === "pending" && "bg-impact-high/10 text-impact-high border-impact-high/20"
                                            )}>
                                                {/* Display the actual status label */}
                                                {report.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onTag(report)}
                                                className="h-8 cursor-pointer gap-2 border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all font-semibold text-xs"
                                            >
                                                {isProcessed ? <Edit className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                                                {isProcessed ? "Edit" : "Tag"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <PaginationComponent startIndex={startIndex} itemsPerPage={ITEMS_PER_PAGE} totalItems={reports.length} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
}