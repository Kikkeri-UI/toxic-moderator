import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"

interface FilterStatusProps {
    onValueChange: (value: string) => void;
}

export const FilterStatusComponent = ({ onValueChange }: FilterStatusProps) => {
    return (
        <div className="w-full md:w-40">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Status
            </label>
            <Select onValueChange={onValueChange} defaultValue="all">
                <SelectTrigger className="bg-background mt-1 cursor-pointer">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="invalid">Invalid</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}