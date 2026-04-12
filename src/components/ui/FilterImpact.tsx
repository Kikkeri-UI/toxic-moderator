import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "./select"

interface FilterImpactProps {
    onValueChange: (value: string) => void;
}

export const FilterImpactComponent = ({ onValueChange }: FilterImpactProps) => {
    return (
        <div className="w-full md:w-40">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Impact
            </label>
            <Select onValueChange={onValueChange} defaultValue="all">
                <SelectTrigger className="bg-background mt-1 cursor-pointer">
                    <SelectValue placeholder="All Impacts" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Impacts</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}