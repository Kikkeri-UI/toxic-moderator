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
import { Tag, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { cn, IMPACT_STYLES } from "@/lib/utils";

interface MessageTableProps {
    reports: Report[];
    onTag: (report: Report) => void;
}

const ITEMS_PER_PAGE = 10;

export function MessageTable({ reports, onTag }: MessageTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = reports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                                return (
                                    <TableRow key={report.id} className={cn("transition-colors", report.status === "processed" ? "bg-muted opacity-80" : "bg-background")}>
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
                                                "text-[10px] font-bold uppercase",
                                                report.status === "processed"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : "bg-impact-high/10 text-impact-high border-impact-high/20"
                                            )}>
                                                {isProcessed ? "tagged" : "untagged"}
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
            <div className="flex items-center justify-between px-2">
                <p className="text-xs text-muted-foreground font-medium">
                    Showing <span className="text-foreground">{startIndex + 1}</span> to <span className="text-foreground">{Math.min(startIndex + ITEMS_PER_PAGE, reports.length)}</span> of <span className="text-foreground">{reports.length}</span> reports
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
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0 cursor-pointer"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}