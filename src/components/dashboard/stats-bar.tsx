/**
 * Component responsible for displaying essential stats at the top of the dashboard
 */

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon, MessageSquare, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItemProps {
    label: string;
    value: number;
    icon: LucideIcon;
    description: string;
    variant?: "default" | "warning" | "success" | "destructive"
}

function StatItem({ label, value, icon: Icon, description, variant = "default" }: StatItemProps) {
    const variants = {
        default: "text-muted-foreground",
        warning: "text-impact-high",
        success: "text-primary",
        destructive: "text-impact-critical"
    }

    return (
        <Card className="overflow-hidden border-border bg-card shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {label}
                        </span>
                        <span className={cn("text-3xl font-bold tracking-tight", variants[variant])}>
                            {value}
                        </span>
                    </div>
                    <div className={cn("rounded-full p-2.5 bg-muted/50", variants[variant])}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <p className="mt-4 text-[11px] text-muted-foreground italic">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

export function StatsBar({ stats }: { stats: { total: number; pending: number; processed: number; invalid: number } }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatItem
                label="Total Reports"
                value={stats.total}
                icon={MessageSquare}
                description="Total messages logged by system"
            />
            <StatItem
                label="Pending Review"
                value={stats.pending}
                icon={AlertCircle}
                variant="warning"
                description="Messages awaiting moderator action"
            />
            <StatItem
                label="Processed"
                value={stats.processed}
                icon={CheckCircle2}
                variant="success"
                description="Successfully tagged and archived"
            />
            <StatItem
                label="Invalid"
                value={stats.invalid}
                icon={ShieldAlert}
                variant="destructive"
                description="Reports marked as false positives"
            />
        </div>
    );
}