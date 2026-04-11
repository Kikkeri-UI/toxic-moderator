import React, { useState, useEffect } from "react"
import { Report } from "@/types";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

interface ProcessedQueueProps {
    reports: Report[]
}

export const ProcessedQueue = ({ reports }: ProcessedQueueProps) => {

    console.log(reports)

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
                        ) : (<></>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

}